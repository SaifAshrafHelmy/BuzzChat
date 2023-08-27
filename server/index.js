const express = require("express")
const app = express()
const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./routers/authRouter")
const morgan = require('morgan')
const {sessionMiddleware,wrap, corsConfig} = require("./controllers/serverController")






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



app.get("/", (req, res) => {
  res.json("Hi There, homepage!")
})




io.on("connect", (socket) => {
  console.log("io server is connected")
  // socket id has to be persistent with username/user id to save data 
  console.log("socket.io conn id: ", socket.id);
  console.log("user connected (socket.io): ", socket.request.session.user.username);
})

server.listen(3030, () => {
  console.log("Server is listening on port 3030")
})

