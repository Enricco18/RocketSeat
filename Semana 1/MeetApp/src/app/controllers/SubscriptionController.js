import { isBefore, startOfDay, addHours, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Mail from '../../lib/Mail';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

const endOftheWorld = new Date(864000000000000);

class SubscriptionController {
    async store(req, res) {
        const meetup_id = req.params.id;
        const meetupExists = await Meetup.findOne({
            where: { id: meetup_id },
            include: [{ model: User, attributes: ['name', 'email'] }]
        });

        if (!meetupExists)
            return res
                .status(401)
                .json({ error: 'This meetup doesnt exists ' });

        const {
            user_id: admin_id,
            date,
            title,
            location,
            User: admin
        } = meetupExists;
        const { name: admin_name, email: admin_email } = admin;
        const userAdmin = admin_id === req.userId;

        if (userAdmin)
            return res
                .status(401)
                .json({ error: 'You cannot subscribe an event you own ' });

        if (isBefore(date, new Date()))
            return res
                .status(400)
                .json({ error: 'Past dates are not allowed' });

        const subscriptionExist = await Subscription.findOne({
            where: { user_id: req.userId, meetup_id }
        });

        if (subscriptionExist)
            return res
                .status(401)
                .json({ error: 'You are already subscribed to this event ' });

        const subConflicted = await Subscription.findOne({
            where: {
                user_id: req.userId
            },
            include: [
                { model: User, attributes: ['id', 'name'] },
                {
                    model: Meetup,
                    as: 'meetupid',
                    attributes: ['id', 'date', 'title'],
                    where: {
                        date: {
                            [Op.between]: [date, addHours(date, 1)]
                        }
                    }
                }
            ]
        });
        if (subConflicted)
            return res
                .status(400)
                .json({ error: 'You already have a Meeting in this hour' });

        const { id, user_id } = await Subscription.create({
            user_id: req.userId,
            meetup_id
        });

        const { name } = await User.findByPk(req.userId);
        await Mail.sendMail({
            to: `${admin_name} <${admin_email}>`,
            subject: `${name} irá ao seu evento!`,
            template: 'subscription',
            context: {
                admin_name,
                name,
                date: format(
                    date,
                    "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h' ",
                    {
                        locale: pt
                    }
                ),
                location,
                title
            }
        });
        return res.status(200).json({
            id,
            user_id,
            meetup_id,
            title,
            admin_name
        });
    }

    async index(req, res) {
        const users = await User.findAll({
            where: {
                id: req.userId
            },
            attributes: ['id', 'name', 'email'],

            include: [
                {
                    model: Meetup,
                    as: 'subscription',
                    attributes: ['id', 'date', 'title', 'user_id'],
                    where: {
                        date: {
                            [Op.between]: [
                                startOfDay(new Date()),
                                endOftheWorld
                            ]
                        }
                    }
                }
            ],
            order: [[{ model: Meetup, as: 'subscription' }, 'date', 'asc']]
        });

        // const subscription = await Subscription.findAll({
        //     where: {
        //         user_id: req.userId
        //     },
        //     attributes: ['user_id'],
        //     include: [
        //         {
        //             model: Meetup,
        //             as: 'meetupid',
        //             attributes: ['id', 'date', 'title', 'user_id'],
        //             where: {
        //                 date: {
        //                     [Op.between]: [
        //                         startOfDay(new Date()),
        //                         endOftheWorld
        //                     ]
        //                 }
        //             }
        //         }
        //     ],
        //     order: [[{ model: Meetup, as: 'meetupid' }, 'date', 'asc']]
        // });
        return res.status(200).send(users);
    }
}

export default new SubscriptionController();
