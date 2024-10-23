/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose, { Document } from "mongoose";
interface IAuth {
  password: string;
  userId: mongoose.Types.ObjectId;
}

interface IAuthModel extends IAuth, Document {}
interface ILoginSanitizedInputs {
  email: string;
  password: string;
}
interface IAuthRecord {
  _id: string;
  role: string;
  accessToken: string;
}

export { IAuth, IAuthModel, ILoginSanitizedInputs, IAuthRecord };
