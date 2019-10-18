import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).send({ ok: 'td certo' });
});

export default router;
