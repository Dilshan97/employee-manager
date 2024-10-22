/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import User from "../user/user.model";
import Auth from "./auth.model";
import bcrypt from "bcryptjs";
import UserService from "../user/user.service";
import AuthService from "./auth.service";
import mongoose, { startSession } from "mongoose";

const seedDefaultUsers = async () => {
  const defaultUsers = [
    {
      firstName: "Edward",
      lastName: "Perera",
      email: "john.doe@example.com",
      phoneNumber: "+94775670987",
      NIC: "945645321V",
      role: "admin",
      gender: "M",
      password: "123",
    },
  ];

  for (const defaultUser of defaultUsers) {
    if (!defaultUser.email || !defaultUser.password) continue;

    const dbUser = await UserService.findByEmail(defaultUser.email);

    if (dbUser) return;

    console.log("------Seeding admin users------");

    const user = new User({ ...defaultUser });

    const hashedPassword = await bcrypt.hash(defaultUser.password, 10);

    const auth = new Auth();
    auth._id = defaultUser.email;
    auth.password = hashedPassword;
    auth.userId = new mongoose.Types.ObjectId(user._id as string);

    const session = await startSession();
    Auth;

    try {
      await session.withTransaction(async () => {
        await UserService.save(user, session);

        await AuthService.save(auth, session);
      });
    } catch (error) {
      throw error;
    } finally {
      await session.endSession();
    }
  }
};

export default { seedDefaultUsers };
