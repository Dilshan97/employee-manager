/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Document } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  NIC: string;
  image: string;
}

interface IUserModel extends IUser, Document {}

interface IUserMutationSanitizedInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  NIC: string;
};

export { IUser, IUserModel, IUserMutationSanitizedInputs };
