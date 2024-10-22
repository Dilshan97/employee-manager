/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import UserService from "../user.service";
import NotFoundError from "../../error/error.classes/NotFoundError";
import { IUserMutationSanitizedInputs } from "../user.interface";

const updateUser = async (
  _id: string | mongoose.Types.ObjectId,
  sanitizedInputs: IUserMutationSanitizedInputs
) => {
  const dbUser = await UserService.findById(_id);

  if (!dbUser) throw new NotFoundError("User not found!");

  Object.assign(dbUser, sanitizedInputs);

  await dbUser.save();

  return dbUser;
};

export default { updateUser };
