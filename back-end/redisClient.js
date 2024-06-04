const redis = require('redis');

let redisClient;

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = redis.createClient();
    
    redisClient.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    redisClient.connect().catch(console.error);
  }

  return redisClient;
};

module.exports = {
  getRedisClient,
};