/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import express from 'express';
import AuthController from './auth.controller';
import LoginSanitizer from './middleware/loginInputSanitizer';

const router = express.Router();

router.post(
    '/login', 
    LoginSanitizer.loginInputSanitizer,
    AuthController.login
);

export default router;