import { Router } from 'express';

import { signUp, signIn, signOut,verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/verify-email',verifyEmail)

authRouter.post('/sign-out', signOut);

export default authRouter;