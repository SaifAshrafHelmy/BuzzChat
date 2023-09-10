const redisClient = require("../../redis.js")



const parsedFriendsList = async (friendsList) => {
  const newFriendsList = [];

  for (let friend of friendsList) {
    const parsedFriend = friend.split(".")
    const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, "connected")
    friendConnectedBoolean = (friendConnected === "true");

    newFriendsList.push({
      username: parsedFriend[0],
      userid: parsedFriend[1],
      connected: friendConnectedBoolean
    })


  }
  return newFriendsList;
}

module.exports = parsedFriendsList;