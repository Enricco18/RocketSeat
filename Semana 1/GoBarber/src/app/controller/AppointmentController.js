import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Notification from '../schema/Notification';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
    async store(req, res) {
        const schema = await Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation failed' });
        }

        const { provider_id, date } = req.body;

        // checa se o id dado e' um provider

        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true }
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Not a provider' });
        }

        // Bota o horário no começo da hora
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permited' });
        }

        // Checa se o provider j'a n tem umm apptmt na hora

        const isAvailable = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if (isAvailable) {
            return res.status(400).json({ error: 'Try another date' });
        }

        const apptmt = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart
        });

        const user = await User.findByPk(req.userId);
        const formattedData = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );

        await Notification.create({
            content: `Agendamento criado para ${user.name} no ${formattedData}`,
            user: provider_id
        });
        return res.json(apptmt);
    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const apptmt = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date', 'id'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }
            ]
        });
        return res.json(apptmt);
    }
}

export default new AppointmentController();
