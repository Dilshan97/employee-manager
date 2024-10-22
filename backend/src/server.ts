/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import "express-async-errors";
import "./express-ts-formatter";
import dotenv from "dotenv";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import ErrorMiddleware from "./modules/error/error.middleware";
import NotFoundError from "./modules/error/error.classes/NotFoundError";
import { constants } from "./utils/constants";

//routes
import AuthRoutes from "./modules/auth/auth.route";
import UserRoutes from "./modules/user/user.route";
import DbConfig from "./config/db.config";
import CommonUtil from "./modules/common/common.util";

// Load environment variables from.env file.
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//health check route
app.use(constants.API.PREFIX.concat("/ping"), (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});

//route definitions
app.use(constants.API.PREFIX.concat("/auth"), AuthRoutes);
app.use(constants.API.PREFIX.concat("/user"), UserRoutes);

//not found route
app.use((req, res, next) => {
  throw new NotFoundError("API Endpoint Not Found!");
});

//error handling middleware
app.use(ErrorMiddleware.errorHandler);

const start = () => {
  try {
    const port = process.env.SERVER_PORT || 4000;

    const dbConfig = DbConfig.getDBConfig();

    app.listen(port, async () => {
      await CommonUtil.connectDB(dbConfig.MONGODB_URL);
      await CommonUtil.onServerStart();
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
