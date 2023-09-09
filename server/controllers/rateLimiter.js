const redisClient = require("../redis");
const IP = require('ip');


module.exports.rateLimiter = (secondsLimit, triesLimit)=> {
  return async (req, res, next) => {
    // rate limiter to put before heavy calc/processing functions/routes
  
    // const ip = req.socket.remoteAddress;
    const ip = req.headers["x-forwarded-for"] || IP.address();
  
    console.log("ip address is: ",ip);
  
  
  
    // incr = if ip exists, increment it... if it doesn't exist, create it...
    // expires / record gets deleted  after 60 seconds
    // exec executes the multiple queries all together
    // value increases but timer resets every time it gets updated`
    const [response] = await redisClient.multi().incr(ip).expire(ip, secondsLimit).exec()
    console.log([response[1]]);
  
    if (response[1] > triesLimit) res.status(429).json({ loggedIn: false, status: "Too many requests, Please wait at least a minute." })
    else {
      next()
    }
  }
}