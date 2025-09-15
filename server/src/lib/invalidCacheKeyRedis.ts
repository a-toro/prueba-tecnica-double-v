import redisClient from "./redis";

export async function invalidCacheKeyRedis(userId: string) {
  const pattern = `debts:${userId}:*`;
  const keys = await redisClient.keys(pattern);
  if (keys.length) {
    await redisClient.del(keys);
  }
}
