import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';

import User from '../models/User';
import File from '../models/File';

class SchedulleController {
    async index(req, res) {
        const { date, page = 1 } = req.query;
        const parsedDate = parseISO(date);
        const meetup = await Meetup.findAll({
            where: {
                date: {
                    [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
                }
            },
            limit: 10,
            offset: (page - 1) * 10,
            order: ['date'],
            include: [
                { model: User, attributes: ['id', 'name'] },
                { model: File, attributes: ['name', 'path', 'url'] }
            ]
        });
        return res.json(meetup);
    }
}

export default new SchedulleController();
