/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { model, Schema } from "mongoose";
import { IAuthModel } from "./auth.interface";
import { constants } from "../../utils/constants";

const AuthSchema: Schema<IAuthModel> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return constants.REGEX_VALIDATIONS.EMAIL.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: constants.MODEL_NAMES.USER,
      required: [true, "User Id is required"],
    },
  },
  { versionKey: true, timestamps: true }
);

export default model<IAuthModel>(constants.MODEL_NAMES.AUTH, AuthSchema);
