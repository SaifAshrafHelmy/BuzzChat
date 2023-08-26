const express = require("express")
const app = express()
const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./routers/authRouter")
const morgan = require('morgan')
const session = require("express-session")
const Redis = require("ioredis")
const RedisStore = require("connect-redis").default

require("dotenv").config()



const frontEndLink = `http://localhost:3000`

// making a basic http server and passing our express app
const server = require('http').createServer(app)

const io = new Server(server, {
  cors: {
    origin: frontEndLink,
    credentials: true
  }
})


const redisClient = new Redis()

app.use(helmet())
app.use(cors({
  origin: frontEndLink,
  credentials: true
}))
app.use(morgan('dev'));
app.use(express.json())
app.use(session({
  secret: process.env.COOKIE_SECRET,
  credentials:true,
  name:"sid",
  store: new RedisStore({ client:redisClient }),
  resave:false,
  // Don't set a cookie if the user hasn't logged in
  saveUninitialized:false,
  cookie:{
    secure:process.env.ENVIRONMENT === "production",
    httpOnly:true,
    sameSite:process.env.ENVIRONMENT === "production" ? "none":"lax",
    expires: 1000 * 60 * 60 * 24 * 7 
  }


}))



app.use("/auth", authRouter)






app.get("/", (req, res) => {
  res.json("Hi There, homepage!")
})




io.on("connect", (socket) => {
  console.log("io server is connected")
})

server.listen(3030, () => {
  console.log("Server is listening on port 3030")
})

