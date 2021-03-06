import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .required()
                .email(),
            password: Yup.string().required()
        });
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const { email, password } = req.body;
        const userExist = await User.findOne({ where: { email } });
        if (!userExist) return res.status(401).json({ error: 'User not find' });
        if (!(await userExist.checkPassword(password)))
            return res.status(401).json({ error: 'Password does not match' });
        const { id, name } = userExist;

        return res.json({
            user: { id, name, email },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn
            })
        });
    }
}

export default new SessionController();
