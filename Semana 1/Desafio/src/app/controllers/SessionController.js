import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Student from '../models/Student';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const { email, password } = req.body;

        const studentExist = await Student.findOne({ where: { email } });
        if (!studentExist) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        if (!(await studentExist.checkPassword(password))) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const { id, name } = studentExist;

        return res.status(200).json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();
