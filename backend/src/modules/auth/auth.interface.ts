/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose, { Document } from "mongoose";

interface IAuth {
  email: string;
  password: string;
  userId: mongoose.Types.ObjectId;
}

interface IAuthModel extends IAuth, Document {}

export { IAuth, IAuthModel };
