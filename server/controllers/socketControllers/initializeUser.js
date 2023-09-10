
const redisClient = require("../../redis.js")
const parsedFriendsList = require("./parsedFriendsList")
const chalk = require('chalk');


module.exports.initializeUser = async socket => {

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
  if (friendRooms.length > 0) {
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



  const messagesQuery = await redisClient.lrange(`chat:${socket.user.userid}`, 0, -1)
  const messages = messagesQuery.map(msgStr => {
    const parsedStr = msgStr.split(".")
    return {
      to: parsedStr[0],
      from: parsedStr[1],
      content: parsedStr[2],
    }
  })

  if(messages && messages.length>0){

    socket.emit("messages", messages)
  }



}
