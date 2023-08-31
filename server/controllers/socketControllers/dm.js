const redisClient = require("../../redis")
const chalk = require('chalk');


module.exports.dm = async (socket, message) => {
  // const editedMessage = {...message, from:socket.user.userid}
  message.from = socket.user.userid;

  console.log(chalk.bold.underline.rgb(0, 150, 100)
    (JSON.stringify(message))
  );

  // to.from.content
  const messageString = [
    message.to,
    message.from,
    message.content
  ].join(".")

  await redisClient.lpush(`chat:${message.from}`, messageString)
  await redisClient.lpush(`chat:${message.to}`, messageString)
  socket.to(message.to).emit("dm", message)


}