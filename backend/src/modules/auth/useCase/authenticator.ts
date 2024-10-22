/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import jwt from "jsonwebtoken";
import UserService from "../../user/user.service";
import AuthService from "../auth.service";
import NotFoundError from "../../error/error.classes/NotFoundError";
import { ILoginSanitizedInputs } from "../auth.interface";

const login = async (sanitizedInputs: ILoginSanitizedInputs) => {
    const dbUser = await UserService.findByEmail(sanitizedInputs.email);

    if(!dbUser) throw new NotFoundError("User not found!");

    const dbAuth = await AuthService.findById(sanitizedInputs.email);

    if(!dbAuth) throw new NotFoundError("Auth not found!");

    const accessTokenPayload = {
        _id: dbUser.email,
        role: dbUser.role
    };

    const accessToken = jwt.sign(accessTokenPayload, String(process.env.JWT_SECRET), {
        expiresIn: '15m'
    });

    return accessToken;
};

export default { login };