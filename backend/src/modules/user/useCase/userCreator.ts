/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import User from "../user.model";
import UserService from "../user.service";
import ForbiddenError from "../../error/error.classes/ForbiddenError";
import { IUserMutationSanitizedInputs } from "../user.interface";

const createUser = async (sanitizedInputs: IUserMutationSanitizedInputs) => {

    const dbUser = await UserService.findByEmail(sanitizedInputs.email);

    if(dbUser) throw new ForbiddenError("User already exists!");

    const user = new User({ ...sanitizedInputs });

    return await UserService.save(user);
};

export default { createUser };