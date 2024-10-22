/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { ClientSession } from "mongoose";
import { IAuthModel } from "./auth.interface";
import Auth from "./auth.model";

const save = async (auth: IAuthModel, session?: ClientSession) => {
  return await auth.save({ session });
};

const findById = async (_id: string, session?: ClientSession) => {
  if (session) return Auth.findById(_id).session(session);
  return Auth.findById(_id);
};

const findByEmail = async (email: string, session?: ClientSession) => {
  if (session) return Auth.findOne({ email: email }).session(session);
  return Auth.findOne({ email: email });
};

const remove = async (
  _id: string | mongoose.Types.ObjectId,
  session?: ClientSession
) => {
  if (session)
    return await Auth.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(_id),
    }).session(session);
  return await Auth.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(_id),
  });
};

export default {
  save,
  findById,
  findByEmail,
  remove,
};
