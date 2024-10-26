/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import CommonUtil from "../../common/common.util";
import { IUserSanitizedResult } from "../user.interface";

const userFetchRequestSanitizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryPrams = req.query as { [key: string]: string };

  const inputValidationSchema = Joi.object({
    keyword: Joi.string().optional().messages({
      "string.empty": "Keyword is required",
    }),
  });

  const { error } = inputValidationSchema.validate(queryPrams, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) CommonUtil.throwCustomJoiDataValidationError(error.details);

  const sanitizedResult: IUserSanitizedResult = {
    keyword: queryPrams.keyword,
  };

  req.body.sanitizedResult = sanitizedResult;

  next();
};

export default { userFetchRequestSanitizer };
