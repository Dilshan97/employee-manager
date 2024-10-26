/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import UserController from "./user.controller";
import CommonMiddleware from "../common/common.middleware";
import AuthMiddleware from "../auth/middleware/authorizer";
import { constants } from "../../utils/constants";
import UserMutationInputSanitizer from "./middleware/userMutationInputSanitizer";
import UserFetchRequestSanitizer from "./middleware/userFetchRequestSanitizer";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserMutationInputSanitizer.mutateSanitizedInputs,
  UserController.createUser
);

router.put(
  "/:id",
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  UserMutationInputSanitizer.mutateSanitizedInputs,
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
  AuthMiddleware.authorize([constants.USER_ROLES.ADMIN]),
  CommonMiddleware.paginate,
  UserFetchRequestSanitizer.userFetchRequestSanitizer,
  UserController.getAllUsers
);

export default router;
