const redisClient = require("../../redis")

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
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  }

  callBack({ done: true, newFriend })

}