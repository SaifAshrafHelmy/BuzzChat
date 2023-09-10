const Redis = require("ioredis")
require("dotenv").config()


const redisClient = new Redis({
  username: process.env.REDIS_SERVICE_NAME, // Render Redis name, red-xxxxxxxxxxxxxxxxxxxx
  host: process.env.REDIS_HOST,             // Render Redis hostname, REGION-redis.render.com
  password: process.env.REDIS_PASSWORD,     // Provided password
  port: process.env.REDIS_PORT || 6379,     // Connection port
});


// Flush the selected database (e.g., database 0)
redisClient.flushdb((err, reply) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Flushed database:', reply); // This will typically return 'OK'
  }

  // Close the Redis connection when done
  redisClient.quit();
});