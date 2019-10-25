import { isBefore, startOfDay, addHours } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

const endOftheWorld = new Date(864000000000000);

class SubscriptionController {
    async store(req, res) {
        const meetup_id = req.params.id;
        const meetupExists = await Meetup.findOne({
            where: { id: meetup_id }
        });

        if (!meetupExists)
            return res
                .status(401)
                .json({ error: 'This meetup doesnt exists ' });

        const { user_id: admin_id, date } = meetupExists;

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

        return res.status(200).json({
            id,
            user_id,
            meetup_id,
            date
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
            ]
        });
        return res.status(200).json(users);
    }
}

export default new SubscriptionController();
