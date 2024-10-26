/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import UserService from "../user.service";
import NotFoundError from "../../error/error.classes/NotFoundError";
import { IPagination } from "../../common/common.interface";
import { IUserSanitizedResult } from "../user.interface";

const getUserById = async (_id: string | mongoose.Types.ObjectId) => {
  const dbUser = await UserService.findById(_id);

  if (!dbUser) throw new NotFoundError("User not found!");

  return dbUser;
};

const getPaginatedUsers = async (pagination: IPagination, sanitizedResult: IUserSanitizedResult) => {
  return await UserService.findPaginatedUsers(pagination, sanitizedResult);
};

export default { getUserById, getPaginatedUsers };
