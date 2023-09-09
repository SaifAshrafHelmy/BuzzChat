const jwt = require("jsonwebtoken")


const jwtSign = (payload, secret, options) => new Promise((resolve, reject) => {
  jwt.sign(payload, secret, options, (error, token) => {
    if (error) reject(error)

    resolve(token)
  })
})


const jwtVerify = (token, secret) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (error, decoded) => {
    if (error) reject(error)

    resolve(decoded)
  })
})

const getJwtToken = req => req.headers["authorization"]?.split(" ")[1]
module.exports = { jwtSign, jwtVerify, getJwtToken }