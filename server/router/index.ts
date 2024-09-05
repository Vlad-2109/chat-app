import { Router } from 'express';
import { registerUser } from '../controller/register.user';
import { checkEmail } from '../controller/check.email';
import { checkPassword } from '../controller/check.password';
import { userDetails } from '../controller/detail.user';

const router = Router();

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/user-details', userDetails);

export default router;
