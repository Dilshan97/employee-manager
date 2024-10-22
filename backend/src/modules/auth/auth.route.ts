/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

export default router;