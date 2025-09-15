import { createClient } from "redis";
import { EnvConfig } from "../config/env";

const redisClient = createClient({
  url: EnvConfig.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("Redis error: ", err));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redic connect");
  }
}

export default redisClient;
