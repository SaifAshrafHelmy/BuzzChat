const redisClient = require("../redis")



module.exports.authorizeUser = async (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request")
    next(new Error("Not authorized"))
    // when we throw a connect_error we setUser to false in useSocketSetup in the frontend
  } else {
    // copy user data from session and attach it to socket.attribute
    socket.user = socket.request.session.user

    // store userid in redis to make it publicly available too. (with the username key)
    // console.log(`username:${socket.user.username}`);
    // console.log(`userid:${socket.user.userid}`);
    redisClient.hset(
      `userid:${socket.user.username}`,
      // so this is the key of the record, and the value to it is an object with a field and a value (or multiple)

      "userid",
      socket.user.userid
    )

    next()
  }
}