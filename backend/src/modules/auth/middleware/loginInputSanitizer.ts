/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import CommonUtil from "../../common/common.util";
import { NextFunction, Request, Response } from "express";

const loginInputSanitizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inputValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email address",
      "any.required": "Email address is required",
      "string.pattern.base": "Invalid email address",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  const { error } = inputValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) CommonUtil.throwCustomJoiDataValidationError(error.details);

  next();
};

export default { loginInputSanitizer };
