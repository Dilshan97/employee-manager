
/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { StatusCodes } from "http-status-codes";
import TestDbConfig from "../../../config/test-db.config";
import UserCreator from "../../../modules/user/useCase/userCreator";
import { IUserMutationSanitizedInputs } from "../../../modules/user/user.interface";
jest.setTimeout(30000);//increase the default timeout 5000 to 300000
describe("TEST: USER CREATOR TEST CASE", () => {

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

    test("should fail if user is exist", async () => {
        try {
            const sanitizedInputs: IUserMutationSanitizedInputs = {
                firstName: "Alison",
                lastName: "Fernando",
                email: "alison.fernando@example.com",
                phoneNumber: "+94785670988",
                gender: "F",
                role: "user",
                NIC: "234567890V"
            };
            await UserCreator.createUser(sanitizedInputs);
        } catch(error: any) {
            expect(error.statusCode).toStrictEqual(StatusCodes.FORBIDDEN);
        }
    });

    test("should create a new user", async () => {
        const sanitizedInputs: IUserMutationSanitizedInputs = {
            firstName: "Jarrod",
            lastName: "Vaughan",
            email: "kugopa@mailinator.com",
            phoneNumber: "+94777123456",
            gender: "M",
            role: "user",
            NIC: "999999999V"
        };
        const user = await UserCreator.createUser(sanitizedInputs);
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("firstName", sanitizedInputs.firstName);
        expect(user).toHaveProperty("lastName", sanitizedInputs.lastName);
        expect(user).toHaveProperty("email", sanitizedInputs.email);
        expect(user).toHaveProperty("phoneNumber", sanitizedInputs.phoneNumber);
        expect(user).toHaveProperty("gender", sanitizedInputs.gender);
        expect(user).toHaveProperty("role", sanitizedInputs.role);
    });

});