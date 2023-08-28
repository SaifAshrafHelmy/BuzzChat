const redisClient = require("../redis")



module.exports.authorizeUser = async (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request")
    next(new Error("Not authorized"))
    // when we throw a connect_error we setUser to false in useSocketSetup in the frontend

  } else {

    next()
  }
}

module.exports.initializeUser = async socket => {
  // copy user data from session and attach it to socket.attribute
  socket.user = socket.request.session.user

  // store userid in redis to make it publicly available too. (with the username key)
  // console.log(`username:${socket.user.username}`);
  // console.log(`userid:${socket.user.userid}`);
  await redisClient.hset(
    `userid:${socket.user.username}`,
    // so this is the key of the record, and the value to it is an object with a field and a value (or multiple)

    "userid",
    socket.user.userid
  )

  const currentFriendsList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0, -1
  )
  console.log("friends:",currentFriendsList)
  socket.emit("friends",currentFriendsList )

  console.log(
    '',
    { userid: socket.user.userid }, '\n',
    { username: socket.user.username }, '\n',
    { conn_id: socket.id }, '\n',
  )

}

module.exports.addFriend = async (socket, friendName, callBack) => {
  console.log(friendName);

  if (friendName === socket.user.username) {
    callBack({ done: false, errorMessage: "No self-friending allowed! Time to expand your social circle." })
    return;
  }

  const friendUserId = await redisClient.hget(
    `userid:${friendName}`,
    "userid"
  )

  if (!friendUserId) {
    callBack({ done: false, errorMessage: "Uh-oh! The username you're trying to add doesn't exist." })
    return;
  }
  
  const currentFriendsList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0, -1
  )
  if(currentFriendsList && currentFriendsList.indexOf(friendName) !== -1){
    callBack({ done: false, errorMessage: "This person is already on your friends list." })
    return;
  }

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    friendName
  )
  callBack({ done: true })



}