/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Request, Response } from "express";
import { IAuthRecord, ILoginSanitizedInputs } from "./auth.interface";
import Authenticator from "./useCase/authenticator";
import { StatusCodes } from "http-status-codes";

const login = async (req: Request, res: Response) => {
  const sanitizedInputs = req.body as ILoginSanitizedInputs;

  const { accessToken, user } = await Authenticator.login(sanitizedInputs);

  return res.status(StatusCodes.OK).json({
    message: "Login successful!",
    payload: { accessToken, user },
  });
};

const logout = async (req: Request, res: Response) => {
  const auth = req.auth as IAuthRecord;

  await Authenticator.logout(auth);

  return res.status(StatusCodes.OK).json({
    message: "Logout Successful!",
  });
};

export default {
  login,
  logout,
};
