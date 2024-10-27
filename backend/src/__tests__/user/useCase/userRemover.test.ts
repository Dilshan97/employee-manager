/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import TestDbConfig from "../../../config/test-db.config";
import UserRemover from "../../../modules/user/useCase/userRemover";
import { StatusCodes } from "http-status-codes";
jest.setTimeout(30000);//increase the default timeout 5000 to 300000
describe("TEST: USER REMOVER TEST CASE", () => {

    beforeAll(async () =>{
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
            const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e677a8");
            await UserRemover.removeUser(userId);
        } catch (error: any) {
            expect(error.statusCode).toStrictEqual(StatusCodes.NOT_FOUND);
        }
    });

    test("should remove the user", async () => {
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a8");
        const dbUser = await UserRemover.removeUser(userId);
        expect(dbUser).toBeUndefined();
    });
});