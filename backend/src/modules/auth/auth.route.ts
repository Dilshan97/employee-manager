/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import AuthController from "./auth.controller";
import LoginSanitizer from "./middleware/loginInputSanitizer";
import AuthMiddleware from "./middleware/authorizer";
import { constants } from "../../utils/constants";

const router = express.Router();

router.post("/login", LoginSanitizer.loginInputSanitizer, AuthController.login);

router.post(
  "/logout",
  AuthMiddleware.authorize(),
  AuthController.logout
);

export default router;
