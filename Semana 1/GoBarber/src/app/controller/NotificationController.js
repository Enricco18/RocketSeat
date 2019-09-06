import Notification from '../schema/Notification';
import User from '../models/User';

class NotificationController {
    async index(req, res) {
        // checa se o id dado e' um provider

        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true }
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'Not a provider' });
        }

        const notification = await Notification.find({ user: req.userId })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notification);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        return res.json(notification);
    }
}

export default new NotificationController();
