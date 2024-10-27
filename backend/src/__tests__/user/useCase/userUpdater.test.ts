/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { StatusCodes } from "http-status-codes";
import TestDbConfig from "../../../config/test-db.config";
import UserUpdater from "../../../modules/user/useCase/userUpdater";
import { IUserMutationSanitizedInputs } from "../../../modules/user/user.interface";
import mongoose from "mongoose";
describe("TEST: USER UPDATER TEST CASE", () => {

    beforeAll(async () => {
        await TestDbConfig.connectToMemoryDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.clearMemoryDatabase();
        await TestDbConfig.closeDatabase();
    });

    beforeEach(async () => {
        await TestDbConfig.loadTestDataToMemoryDb();
    });

    afterEach(async () => {
        await TestDbConfig.clearMemoryDatabase();
    });

    test("should fail when user is not exist", async () => {
        try {
            const userId = new mongoose.Types.ObjectId("671ca296d8307616b9e777b7");
            const sanitizedInputs: IUserMutationSanitizedInputs = {
                firstName: "Alison",
                lastName: "Fernando",
                email: "alison.fernando@example.com",
                phoneNumber: "+94785670988",
                gender: "F",
                role: "user",
                NIC: "234567890V",
            };
            await UserUpdater.updateUser(userId, sanitizedInputs);
        } catch (error: any) {
            expect(error.statusCode).toStrictEqual(StatusCodes.NOT_FOUND);
        }
    });

    test("should update user", async () => {
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");
        const sanitizedInputs: IUserMutationSanitizedInputs = {
            firstName: "Alison",
            lastName: "Fernando",
            email: "alison.fernando@example.com",
            phoneNumber: "+94785670988",
            gender: "F",
            role: "user",
            NIC: "234567890V",
        };
       const dbUser =  await UserUpdater.updateUser(userId, sanitizedInputs);

        expect(dbUser).toHaveProperty("firstName", sanitizedInputs.firstName);
        expect(dbUser).toHaveProperty("lastName", sanitizedInputs.lastName);
        expect(dbUser).toHaveProperty("email", sanitizedInputs.email);
        expect(dbUser).toHaveProperty("phoneNumber", sanitizedInputs.phoneNumber);
        expect(dbUser).toHaveProperty("gender", sanitizedInputs.gender);
        expect(dbUser).toHaveProperty("role", sanitizedInputs.role);
        expect(dbUser).toHaveProperty("NIC", sanitizedInputs.NIC);
    });
});

