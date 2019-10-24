import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .required()
                .email(),
            password: Yup.string()
                .min(6)
                .required(),
            age: Yup.number()
                .integer()
                .required(),
            weight: Yup.number(),
            height: Yup.number()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const studentExist = await Student.findOne({
            where: { email: req.body.email }
        });

        if (studentExist) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        const { id, name, email, weight, height, age } = await Student.create(
            req.body
        );

        return res.status(200).json({ id, name, email, weight, height, age });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string()
                .min(6)
                .when('password', (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field
                ),
            age: Yup.number().integer(),
            weight: Yup.number(),
            height: Yup.number()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation failed' });

        const student = await Student.findByPk(req.userId);
        const { email, oldPassword } = req.body;

        if (email !== student.email) {
            const studentExist = await Student.findOne({
                where: { email }
            });

            if (studentExist) {
                return res.status(400).json({ error: 'User already exists!' });
            }
        }

        if (oldPassword && !(await student.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match!' });
        }

        const { id, name, weight, height, age } = await student.update(
            req.body
        );

        return res.json({ id, email, name, weight, height, age });
    }
}

export default new StudentController();
