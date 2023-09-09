const redisClient = require("../redis")
const RedisStore = require("connect-redis").default
const frontEndLink = `http://localhost:3000`


require("dotenv").config()




// separating the session to use express session with socket io
// const sessionMiddleware = session({
//   secret: process.env.COOKIE_SECRET,
//   credentials:true,
//   name:"sid",
//   store: new RedisStore({ client:redisClient }),
//   resave:false,
//   // Don't set a cookie if the user hasn't logged in
//   saveUninitialized:false,
//   cookie:{
//     secure:false,
//     httpOnly:true,
//     sameSite:"lax",
//     expires: 1000 * 60 * 60 * 24 * 7 
//   }

// })


// wrapper for socket.io 
// const wrap = (expressMiddleware) => {
//   return (socket,next)=>{
//     expressMiddleware(socket.request, {}, next)
//   }
// }


const corsConfig = {
  origin: frontEndLink,
  credentials: true
}
// doing this to use the same session instance in express and socket.io
module.exports = { corsConfig};