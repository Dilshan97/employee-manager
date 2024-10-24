/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import UserController from "./user.controller";
import UserMiddleware from "./user.middleware";
import CommonMiddleware from "../common/common.middleware";
import AuthMiddleware from "../auth/middleware/authorizer";
import { constants } from "../../utils/constants";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserMiddleware.mutateSanitizedInputs,
  UserController.createUser
);

router.put(
  "/:id",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserMiddleware.mutateSanitizedInputs,
  UserController.updateUser
);

router.delete(
  "/:id",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserController.deleteUser
);

router.get(
  "/:id",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserController.getUserById
);

router.get(
  "/",
  // AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  CommonMiddleware.paginate,
  UserController.getAllUsers
);

export default router;
