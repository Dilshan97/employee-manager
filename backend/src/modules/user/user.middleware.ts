/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import CommonUtil from "../common/common.util";
import { constants } from "../../utils/constants";
import { NextFunction, Request, Response } from "express";

const mutateSanitizedInputs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const inputValidationSchema = Joi.object({
    firstName: Joi.string().min(6).max(10).required().messages({
      "string.min": "First name must be at least 6 characters long",
      "string.max": "First name must not exceed 10 characters",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().min(6).max(10).required().messages({
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name must not exceed 10 characters",
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email address",
      "any.required": "Email address is required",
      "string.pattern.base": "Invalid email address",
    }),
    phoneNumber: Joi.string()
      .regex(constants.REGEX_VALIDATIONS.PHONE_NUMBER)
      .required()
      .messages({
        "string.pattern.base": "Invalid phone number format",
        "any.required": "Phone number is required",
      }),
    gender: Joi.string().valid("M", "F").required().messages({
      "any.only": "Gender must be either 'M' or 'F'",
      "any.required": "Gender is required",
    }),
    role: Joi.string()
      .valid(constants.USER_ROLES.ADMIN, constants.USER_ROLES.USER)
      .required()
      .messages({
        "any.only": "Role must be either 'ADMIN' or 'USER'",
        "any.required": "Role is required",
      }),
    NIC: Joi.string()
      .regex(constants.REGEX_VALIDATIONS.NIC)
      .required()
      .messages({
        "any.required": "NIC is required",
        "string.pattern.base": "Invalid NIC number format",
      }),
  });

  const { error } = inputValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) CommonUtil.throwCustomJoiDataValidationError(error.details);

  next();
};

export default { mutateSanitizedInputs };
