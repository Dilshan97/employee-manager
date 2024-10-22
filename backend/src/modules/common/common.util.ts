/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import mongoose from "mongoose";
import DataValidationError, {
  TKeyValuePair,
} from "../error/error.classes/DataValidationError";
import AuthUtil from "../auth/auth.util";

const connectDB = async (url: string) => {
  return mongoose
    .connect(url, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("MONGO DB CONNECTION SUCCESSFUL!");
    })
    .catch((err) => {
      console.error(err);
    });
};

const throwCustomJoiDataValidationError = (
  errDetails: Array<Joi.ValidationErrorItem>
) => {
  const errKeyValuePairs: TKeyValuePair = [];
  for (const errDetail of errDetails) {
    const key = errDetail.path.join(".");
    const message = errDetail.message;

    errKeyValuePairs.push({
      key,
      message,
    });
  }

  throw new DataValidationError(errKeyValuePairs);
};

const onServerStart = async () => {
  await AuthUtil.seedDefaultUsers();
};

export default {
  connectDB,
  throwCustomJoiDataValidationError,
  onServerStart,
};
