const express = require("express")
const app = express()
const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")



const frontEndLink = `http://localhost:3000`

// making a basic http server and passing our express app
const server = require('http').createServer(app)

const io = new Server(server, {
  cors: {
    origin: frontEndLink,
    credentials: "true"
  }
})



app.use(helmet())
app.use(cors({
  origin: frontEndLink,
  credentials: "true"
}))
app.use(express.json())



app.post("/auth/login", (req, res) => {
  res.json("confirmed login!")
})
app.post("/auth/register", (req, res) => {
  res.json("confirmed signup!")
})

app.get("/", (req, res) => {
  res.json("Hi There!")
})




io.on("connect", (socket) => {
  console.log("io server is connected")
})

server.listen(3030, () => {
  console.log("Server is listening on port 3030")
})

