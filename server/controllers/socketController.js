const redisClient = require("../redis")
const chalk = require('chalk');



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

  // join the room our friends gonna communicate with us to
  socket.join(socket.user.userid)

  // store userid in redis to make it publicly available too. (with the username key)
  // console.log(`username:${socket.user.username}`);
  // console.log(`userid:${socket.user.userid}`);
  await redisClient.hset(
    `userid:${socket.user.username}`,
    // so this is the key of the record, and the value to it is an object with a field and a value (or multiple)

    "userid",
    socket.user.userid,
    "connected",
    true
  )

    // get friends list
    const friendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1)
    // get friends ids
    const userParsedFriendsList = await parsedFriendsList(friendsList)
    const friendRooms = userParsedFriendsList.map(friend => friend.userid)
    // tell(emit) to all friends that you're online now
    if(friendRooms.length>0)
    {
      socket.to(friendRooms).emit("connected", true, socket.user.username)

      console.log(chalk.bold.underline.rgb(128, 0, 128)
      (`user ${socket.user.username} Connected`)
      );
    }

    

  // console.log("friends:", userParsedFriendsList)
  socket.emit("friends", userParsedFriendsList)

  // console.log(
  //   '',
  //   { userid: socket.user.userid }, '\n',
  //   { username: socket.user.username }, '\n',
  //   { conn_id: socket.id }, '\n',
  // )


  
}

module.exports.addFriend = async (socket, friendName, callBack) => {
  console.log(friendName);

  if (friendName === socket.user.username) {
    callBack({ done: false, errorMessage: "No self-friending allowed! Time to expand your social circle." })
    return;
  }

  const friend = await redisClient.hgetall(
    `userid:${friendName}`,
  )

  if (!friend.userid) {
    callBack({ done: false, errorMessage: "Uh-oh! The username you're trying to add doesn't exist." })
    return;
  }

  const currentFriendsList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0, -1
  )
  if (currentFriendsList && currentFriendsList.indexOf(friendName) !== -1) {
    callBack({ done: false, errorMessage: "This person is already on your friends list." })
    return;
  }

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userid].join(".")
  )

  const newFriend = {
    username:friendName,
    userid:friend.userid,
    connected:friend.connected,
  }

  callBack({ done: true, newFriend })

}

module.exports.onDisconnect = async (socket) => {

  await redisClient.hset(
    `userid:${socket.user.username}`,

    "connected",
    false
  )
  // get friends list
  const friendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1)
  // get friends ids
  const userParsedFriendsList = await parsedFriendsList(friendsList)
  const friendRooms = userParsedFriendsList.map(friend => friend.userid)  // tell(emit) to all friends that you're offline now
  if(friendRooms.length>0)
  {
    socket.to(friendRooms).emit("connected", false, socket.user.username)

    console.log(chalk.bold.underline.rgb(128, 0, 128)
    (`user ${socket.user.username} DISconnected`)
    );
  }
}

const parsedFriendsList = async (friendsList) => {
  const newFriendsList = [];

  for (let friend of friendsList) {
    const parsedFriend = friend.split(".")
    const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, "connected")
    friendConnectedBoolean = (friendConnected === "true");

    newFriendsList.push({
      username:parsedFriend[0],
      userid:parsedFriend[1],
      connected: friendConnectedBoolean
    })


  }
  return newFriendsList;
}