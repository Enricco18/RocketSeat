import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .required()
                .email(),
            age: Yup.number()
                .integer()
                .required(),
            weight: Yup.number(),
            height: Yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const studentExist = await Student.findOne({
            where: { email: req.body.email }
        });

        if (studentExist) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        const { id, name, email, weight, height, age } = await Student.create(
            req.body
        );

        return res.status(200).json({
            id,
            name,
            email,
            weight,
            height,
            age
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number()
                .integer()
                .required(),
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number().integer(),
            weight: Yup.number(),
            height: Yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const student = await Student.findByPk(req.body.id);

        if (req.body.email && req.body.email !== student.email) {
            const studentExist = await Student.findOne({
                where: { email: req.body.email }
            });

            if (studentExist) {
                return res.status(400).json({ error: 'User already exists!' });
            }
        }

        const { id, name, weight, height, age, email } = await student.update(
            req.body
        );

        return res.json({
            id,
            email,
            name,
            weight,
            height,
            age
        });
    }
}

export default new StudentController();
