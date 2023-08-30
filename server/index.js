const express = require("express")
const app = express()
const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./routers/authRouter")
const morgan = require('morgan')
const {sessionMiddleware,wrap, corsConfig} = require("./controllers/serverController")
const { authorizeUser, addFriend, initializeUser, onDisconnect } = require("./controllers/socketController")
const chalk = require('chalk');






// making a basic http server and passing our express app
const server = require('http').createServer(app)

const io = new Server(server, {
  cors: corsConfig
})



app.use(helmet())
app.use(cors(corsConfig))
app.use(morgan('dev'));
app.use(express.json())
app.use(sessionMiddleware)




app.use("/auth", authRouter)

io.use(wrap(sessionMiddleware))
io.use(authorizeUser)


io.on("connect", (socket) => {
  initializeUser(socket);
  console.log("io server is connected")



  socket.on("add_friend", (friendName, callBack)=> addFriend(socket, friendName,callBack))
  socket.on("disconnecting", ()=> onDisconnect(socket))

})

server.listen(3030, () => {
  console.log("Server is listening on port 3030")
})

