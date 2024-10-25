/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import jwt from "jsonwebtoken";
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import NotFoundError from "../../error/error.classes/NotFoundError";
import { IAuthRecord, ILoginSanitizedInputs } from "../auth.interface";
import AuthCacher from "../auth.cacher";
import UnAuthorizedError from "../../error/error.classes/UnAuthorizedError";

const login = async (
  sanitizedInputs: ILoginSanitizedInputs
): Promise<string> => {
  const dbUser = await UserService.findByEmail(sanitizedInputs.email);

  if (!dbUser) throw new NotFoundError("User not found!");

  const dbAuth = await AuthService.findById(sanitizedInputs.email);

  if (!dbAuth) throw new NotFoundError("Auth not found!");

  //generate access token
  const accessToken = jwt.sign(
    {
      _id: dbUser.email,
      role: dbUser.role,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "60m",
    }
  );

  //check auth record existence in cache
  const authRecord = await AuthCacher.getAuthRecord(dbUser.email);

  if (!authRecord) {
    //if not save in cache
    await AuthCacher.createAuthRecord({
      _id: dbUser.email,
      role: dbUser.role,
      accessToken: accessToken,
    });
  } else {
    // if exist update with the new access token
    authRecord.accessToken = accessToken;
    await AuthCacher.updateAuthRecord(authRecord);
  }

  return accessToken;
};

const logout = async (auth: IAuthRecord): Promise<void> => {
  const authRecord = await AuthCacher.getAuthRecord(auth._id);

  if (!authRecord)
    throw new UnAuthorizedError("Auth session is not found! Sign in again.");

  await AuthCacher.removeAuthRecord(authRecord._id);

  return;
};

export default { login, logout };
