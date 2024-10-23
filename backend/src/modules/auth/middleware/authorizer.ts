/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import AuthUtil from "../auth.util";
import { NextFunction, Request, Response } from "express";
import UnAuthorizedError from "../../error/error.classes/UnAuthorizedError";
import AuthCacher from "../auth.cacher";

const authorize = (authorizedRoles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    //get authorization header from headers
    const authHeader = req.headers.authorization;

    // validate authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnAuthorizedError(
        "You're not authorized to access this resource!-1"
      );
    }

    //extract access token
    const accessToken = authHeader.split(" ")[1];

    const tokenPayload = AuthUtil.validateAndGetTokenPayload(
      accessToken
    ) as any;

    // if (!authorizedRoles.includes(tokenPayload.role)) {
    //   throw new UnAuthorizedError(
    //     "You're not authorized to access this resource!-2"
    //   );
    // }

    //get auth record from cache
    const authRecord = await AuthCacher.getAuthRecord(tokenPayload._id);

    if(!authRecord) {
      throw new UnAuthorizedError(
        "You're not authorized to access this resource!-3"
      );
    }
    
    //validate access token with cached token
    if (accessToken !== authRecord.accessToken) {
      throw new UnAuthorizedError('User session is invalid!');
    }

    //bind auth record to auth
    req.auth = authRecord;

    next();
  };
};

export default { authorize };
