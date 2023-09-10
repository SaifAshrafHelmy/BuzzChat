const Redis = require("ioredis")
require("dotenv").config()

const redisClient = new Redis({
  username: process.env.REDIS_SERVICE_NAME, // Render Redis name, red-xxxxxxxxxxxxxxxxxxxx
  host: process.env.REDIS_HOST,             // Render Redis hostname, REGION-redis.render.com
  password: process.env.REDIS_PASSWORD,     // Provided password
  port: process.env.REDIS_PORT || 6379,     // Connection port
});



module.exports = redisClient; 

