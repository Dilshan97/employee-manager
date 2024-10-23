/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { IAuthRecord } from "./auth.interface";
import RedisConfig from "../../config/redis.config";
import AuthUtil from "./auth.util";
import NotFoundError from "../error/error.classes/NotFoundError";

const createAuthRecord = async (body: IAuthRecord): Promise<void> => {
  const redisClient = await RedisConfig.getInstance();
  const key = AuthUtil.getAuthKey(body._id);
  await redisClient.set(key, JSON.stringify(body));
};

const updateAuthRecord = async (body: IAuthRecord) => {
  const redisClient = await RedisConfig.getInstance();
  const key = AuthUtil.getAuthKey(body._id);
  const result = await redisClient.get(key);
  if (result) {
    await redisClient.set(key, JSON.stringify(body));
  } else {
    return new NotFoundError("Auth record is not found! Sign in again.");
  }
};

const getAuthRecord = async (authId: string): Promise<IAuthRecord | null> => {
  const redisClient = await RedisConfig.getInstance();
  const key = AuthUtil.getAuthKey(authId);
  const result = await redisClient.get(key);
  if (result) {
    const authSession: IAuthRecord = JSON.parse(result);
    return authSession;
  }
  return null;
};

const removeAuthRecord = async (authId: string): Promise<void> => {
  const redisClient = await RedisConfig.getInstance();
  const key = AuthUtil.getAuthKey(authId);
  await redisClient.del(key);
};

export default {
  createAuthRecord,
  updateAuthRecord,
  getAuthRecord,
  removeAuthRecord,
};
