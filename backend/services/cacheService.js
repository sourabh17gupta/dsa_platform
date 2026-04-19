const { getRedisClient } = require("../config/redis");

const DEFAULT_TTL = 60 * 5; // 5 minutes

const getCache = async (key) => {
  try {
    const client = getRedisClient();
    const data = await client.get(key);
    if (data) {
      console.log(`✅ REDIS HIT  → key: "${key}"`);
      return JSON.parse(data);
    } else {
      console.log(`❌ REDIS MISS → key: "${key}" (fetching from MongoDB)`);
      return null;
    }
  } catch (err) {
    console.error("Redis GET error:", err);
    return null;
  }
};

const setCache = async (key, value, ttl = DEFAULT_TTL) => {
  try {
    const client = getRedisClient();
    await client.setEx(key, ttl, JSON.stringify(value));
    console.log(`💾 REDIS SET  → key: "${key}" | TTL: ${ttl}s`);
  } catch (err) {
    console.error("Redis SET error:", err);
  }
};

const deleteCache = async (keys) => {
  try {
    const client = getRedisClient();
    const targets = Array.isArray(keys) ? keys : [keys];
    if (targets.length) {
      await client.del(targets);
      console.log(`🗑️  REDIS DEL  → keys: ${targets.join(", ")}`);
    }
  } catch (err) {
    console.error("Redis DEL error:", err);
  }
};

const deleteCachePattern = async (pattern) => {
  try {
    const client = getRedisClient();
    const keys = await client.keys(pattern);
    if (keys.length) {
      await client.del(keys);
      console.log(`🗑️  REDIS DEL PATTERN → "${pattern}" | deleted: ${keys.length} keys`);
    }
  } catch (err) {
    console.error("Redis PATTERN DEL error:", err);
  }
};

module.exports = { getCache, setCache, deleteCache, deleteCachePattern };