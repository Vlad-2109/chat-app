import { Router } from 'express';
import { registerUser } from '../controller/register.user';
import { checkEmail } from '../controller/check.email';
import { checkPassword } from '../controller/check.password';
import { userDetails } from '../controller/detail.user';
import { logout } from '../controller/logout';

const router = Router();

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/user-details', userDetails);
router.get('/logout', logout);

export default router;
