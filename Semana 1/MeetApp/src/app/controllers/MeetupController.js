import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            image_id: Yup.number().integer()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const { title, description, location, date, image_id } = req.body;
        const parsedDate = parseISO(date);

        if (isBefore(parsedDate, new Date()))
            return res
                .status(401)
                .json({ error: 'Past dates are not allowed' });

        const meetup = await Meetup.create({
            title,
            description,
            location,
            date,
            image_id,
            user_id: req.userId
        });

        return res.status(200).json(meetup);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date(),
            image_id: Yup.number().integer()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const meetup = await Meetup.findByPk(req.params.id);
        if (!meetup) return res.status(400).json({ error: 'Meetup not found' });

        const isAdmin = req.userId === meetup.user_id;

        if (!isAdmin)
            return res
                .status(401)
                .json({ error: 'You are not the admin of this event' });

        if (isBefore(meetup.date, new Date()))
            return res
                .status(401)
                .json({ error: 'Past dates are not allowed' });

        const {
            title,
            description,
            location,
            date,
            image_id
        } = await meetup.update(req.body);

        return res
            .status(200)
            .json({ title, description, location, date, image_id });
    }

    async index(req, res) {
        const meetup = await Meetup.findAll({
            where: { user_id: req.userId },
            order: ['date'],
            include: [
                { model: User, attributes: ['id', 'name'] },
                { model: File, attributes: ['name', 'path', 'url'] }
            ]
        });
        if (!meetup) return res.status(400).json({ error: 'Meetup not found' });

        return res.status(200).json(meetup);
    }

    async delete(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);
        if (!meetup) return res.status(400).json({ error: 'Meetup not found' });

        const isAdmin = req.userId === meetup.user_id;

        if (!isAdmin)
            return res
                .status(401)
                .json({ error: 'You are not the admin of this event' });

        if (isBefore(meetup.date, new Date()))
            return res
                .status(401)
                .json({ error: 'Past dates are not allowed' });

        await meetup.destroy();
        return res.status(200).json({ message: `The meetup was cancelled` });
    }
}

export default new MeetupController();
