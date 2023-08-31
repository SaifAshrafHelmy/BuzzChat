const {authorizeUser} = require("./socketControllers/authorizeUser")
const {initializeUser} = require("./socketControllers/initializeUser")
const {addFriend} = require("./socketControllers/addFriend")
const {onDisconnect} = require("./socketControllers/onDisconnect")
const {dm} = require("./socketControllers/dm")



module.exports ={
  authorizeUser,
  initializeUser,
  onDisconnect,
  addFriend,
  dm
}




