import { Router } from 'express';
import { instanceController } from '../controller/instanceController'

const router = Router();

router.get('/', new instanceController().connectToWhatsApp)

router.get('/teste', (req, res) => {
    res.send('Hello World!');
})

export default router
