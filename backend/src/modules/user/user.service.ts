/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { ClientSession } from "mongoose";
import { IUserModel, IUserSanitizedResult } from "./user.interface";
import User from "./user.model";
import { IPagination } from "../common/common.interface";

const save = async (user: IUserModel, session?: ClientSession) => {
  return await user.save({ session });
};

const findById = async (
  _id: string | mongoose.Types.ObjectId,
  session?: ClientSession
) => {
  if (session) return User.findById(_id).session(session);
  return User.findById(_id);
};

const findByEmail = async (email: string, session?: ClientSession) => {
  if (session) return User.findOne({ email }).session(session);
  return User.findOne({ email });
};

const findPaginatedUsers = async (
  pageable: IPagination,
  sanitizedResult: IUserSanitizedResult
) => {
  const { page, limit, orderBy } = pageable as IPagination;

  let queryObj: any = {};

  if (sanitizedResult.keyword) {
    queryObj.$or = [
      {
        firstName: {
          $regex: sanitizedResult.keyword,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: sanitizedResult.keyword,
          $options: "i",
        },
      },
    ];
  }

  const result = await User.aggregate([
    {
      $match: {
        ...queryObj,
      },
    },
    {
      $sort: {
        _id: orderBy === "desc" ? -1 : 1,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "totalElements" }],
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
      },
    },
  ]);
  const content = result[0].data;
  const totalElements = result[0]?.metadata[0]?.totalElements || 0;

  return {
    content,
    totalElements,
    totalPages: Math.ceil(totalElements / limit),
  };
};

export default {
  save,
  findById,
  findByEmail,
  findPaginatedUsers,
};
