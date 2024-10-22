/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { model, Schema } from "mongoose";
import { IUserModel } from "./user.interface";
import { constants } from "../../utils/constants";

const UserSchema: Schema<IUserModel> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [6, "First name should be at least 6 characters long"],
      maxlength: [10, "First name should not exceed 10 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [6, "Last name should be at least 6 characters long"],
      maxlength: [10, "Last name should not exceed 10 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => constants.REGEX_VALIDATIONS.EMAIL.test(email),
        message: "{VALUE} is not a valid email",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (phoneNumber) => constants.REGEX_VALIDATIONS.PHONE_NUMBER.test(phoneNumber),
        message: "{VALUE} is not a valid phone number",
      },
    },
    gender: {
      type: String,
      enum: {
        values: [
          constants.GENDER.MALE,
          constants.GENDER.FEMALE,
        ],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    role: {
      type: String,
      enum: {
        values: [
          constants.USER_ROLES.ADMIN,
          constants.USER_ROLES.USER,
        ],
        message: "{VALUE} is not a valid role",
      },
      required: [true, "Role is required"],
    },
    NIC: {
      type: String,
      required: [true, "NIC is required"],
      validate: {
        validator: (NIC) => constants.REGEX_VALIDATIONS.NIC.test(NIC),
        message: "{VALUE} is not a valid NIC",
      },
    },
    image: {
      type: String,
      required: false
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<IUserModel>(constants.MODEL_NAMES.USER, UserSchema);
