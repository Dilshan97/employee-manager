/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ping", (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use((req, res, next) => {
  throw new Error("API Endpoint Not Found!");
});

const start = () => {
  try {
    const port = process.env.SERVER_PORT;

    app.listen(port, async () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
