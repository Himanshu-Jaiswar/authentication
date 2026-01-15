import express from 'express'
import { adminController, logoutUser, profile, refreshCSRF, refreshToken, register, userLogin, verifyOtp, verifyUser } from '../controllers/userController.js';
import { authorizedAdmin, isAuth } from '../middlewares/isAuth.js';
import { verifyCSRFToken } from '../config/csrfMiddlewares.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify/:token', verifyUser);
router.post('/login', userLogin);
router.post('/verify', verifyOtp);
router.get('/profile', isAuth, profile);
router.post('/refresh', refreshToken);
router.post('/logout', isAuth, verifyCSRFToken, logoutUser);
router.post('/refresh-csrf', refreshCSRF);
router.get('/admin', isAuth, authorizedAdmin, adminController);

export default router;