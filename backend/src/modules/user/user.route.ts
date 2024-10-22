/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import UserController from "./user.controller";
import UserMiddleware from "./user.middleware";
import CommonMiddleware from "../common/common.middleware";

const router = express.Router();

router.post(
    "/",
    UserMiddleware.mutateSanitizedInputs, 
    UserController.createUser
);

router.put(
    "/:id", 
    UserMiddleware.mutateSanitizedInputs,
    UserController.updateUser
);

router.delete("/:id", UserController.deleteUser);

router.get("/:id", UserController.getUserById);

router.get(
    "/",
    CommonMiddleware.paginate, 
    UserController.getAllUsers
);

export default router;
