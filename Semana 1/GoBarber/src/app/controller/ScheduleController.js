import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
    async index(req, res) {
        const providerId = req.userId;

        const isProvider = await User.findOne({
            where: {
                id: providerId,
                provider: true
            }
        });

        if (!isProvider) {
            return res.status(400).json * { error: 'Not a provider! ' };
        }

        const { date } = req.query;
        const parseDate = parseISO(date);

        const apptmt = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
                }
            },
            order: ['date', 'id'],
            attributes: ['id', 'date'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name']
                }
            ]
        });

        return res.json({ apptmt });
    }
}

export default new ScheduleController();
