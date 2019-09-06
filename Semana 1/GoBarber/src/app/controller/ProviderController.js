import User from '../models/User';
import File from '../models/File';

class ProviderController {
    async index(req, res) {
        const user = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'password'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url']
                }
            ]
        });
        return res.json(user);
    }
}
export default new ProviderController();
