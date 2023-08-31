const redisClient = require("../../redis")
const parsedFriendsList = require("./parsedFriendsList")
const chalk = require('chalk');


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
  if (friendRooms.length > 0) {
    socket.to(friendRooms).emit("connected", false, socket.user.username)

    console.log(chalk.bold.underline.rgb(128, 0, 128)
      (`user ${socket.user.username} DISconnected`)
    );
  }
}

