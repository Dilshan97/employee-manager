/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const getRedisConnectionUrl = (): string | undefined => {
  return process.env.REDIS_URL;
};

const client = createClient({
  url: getRedisConnectionUrl(),
});

const getInstance = () => client;

client.connect();

client.on("connect", () => {
  console.log("Client connected to Redis");
});

client.on("ready", () => {
  console.log("Client connected to Redis and Ready to use");
});

client.on("error", (err: any) => {
  // console.log('ERROR : ' + err.message);
});

client.on("end", () => {
  console.log("Client disconnected from Redis");
});

process.on("SIGINT", () => {
  client.quit();
});

export default { getInstance };
