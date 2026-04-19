const { createClient } = require("redis");

let client;

const connectRedis = async () => {
  client = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  });

  client.on("error", (err) => console.error("Redis Error:", err));
  client.on("connect", () => console.log("Redis connected"));

  await client.connect();
};

const getRedisClient = () => {
  if (!client) throw new Error("Redis not initialized. Call connectRedis() first.");
  return client;
};

module.exports = { connectRedis, getRedisClient };