/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Request, Response } from "express";
import { IUserMutationSanitizedInputs, IUserSanitizedResult } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import UserCreator from "./useCase/userCreator";
import UserUpdater from "./useCase/userUpdater";
import UserRemover from "./useCase/userRemover";
import UserGetter from "./useCase/userGetter";
import { IPagination } from "../common/common.interface";

const createUser = async (req: Request, res: Response) => {
  const sanitizedInputs = req.body as IUserMutationSanitizedInputs;

  const user = await UserCreator.createUser(sanitizedInputs);

  return res.status(StatusCodes.CREATED).json({
    message: "User successfully created!",
    payload: user,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sanitizedInputs = req.body as IUserMutationSanitizedInputs;

  const dbUser = await UserUpdater.updateUser(id, sanitizedInputs);

  return res.status(StatusCodes.OK).json({
    message: "User successfully updated!",
    payload: dbUser,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await UserRemover.removeUser(id);

  return res.status(StatusCodes.OK).json({
    message: "User successfully deleted!",
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dbUser = await UserGetter.getUserById(id);

  return res.status(StatusCodes.OK).json({
    message: "User successfully retrieved!",
    payload: dbUser,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const pagination = req.pageable as IPagination;
  const sanitizedResult = req.body.sanitizedResult as IUserSanitizedResult;
  const dbUsers = await UserGetter.getPaginatedUsers(pagination, sanitizedResult);

  return res.status(StatusCodes.OK).json({
    payload: dbUsers,
  });
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
