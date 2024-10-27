/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import UserService from "../user.service";
import NotFoundError from "../../error/error.classes/NotFoundError";

const removeUser = async (_id: string | mongoose.Types.ObjectId): Promise<void> => {
  const dbUser = await UserService.findById(_id);

  if (!dbUser) throw new NotFoundError("User not found!");

  await dbUser.deleteOne();

  return;
};

export default { removeUser };
