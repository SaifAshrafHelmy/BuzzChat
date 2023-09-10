const { jwtVerify } = require("../jwt/jwt-auth");
require("dotenv").config()

module.exports.authorizeUser = async (socket, next) => {

  const token = socket.handshake.auth.token;
  console.log("socket.handshake: ",socket.handshake);
  console.log("token is: ",token)
  jwtVerify(token, process.env.JWT_SECRET)
    .then(decoded => {
      socket.user = { ...decoded }
      next()
    })
    .catch(error => {
      console.log("Bad Request bru")
      console.log(error)
      next(new Error("Not authorized"))


    })

}
