const pool = require("../db")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")
const { jwtSign, jwtVerify, getJwtToken } = require("./jwt/jwt-auth")
require("dotenv").config()

module.exports.handleRegisterPOST = async (req, res) => {

  // check for username uniqueness 
  const existingUsername = await pool.query("SELECT username FROM users WHERE username = $1;", [req.body.username])
  if (existingUsername.rowCount === 0) {
    // register
    console.log("username is unique");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash, userid) VALUES($1, $2, $3) RETURNING id,username, userid;",
      [req.body.username, hashedPassword, uuidv4()])


    jwtSign({
      username: req.body.username,
      id: newUserQuery.rows[0].id,
      userid: newUserQuery.rows[0].userid
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    }).then(token => {
      res.json({ loggedIn: true, token })
    }).catch(err => {
      console.log(err)
      res.json({ loggedIn: false, status: "something went wrong, please try again later." })
    })

  } else {
    // return message
    console.log("username already exists");
    res.json({ loggedIn: false, status: "Username already exists!" })
  }
}








module.exports.handleLoginGET = (req, res) => {

  // bearer 123d34 
  const token = getJwtToken(req)
  if(!token){
    return res.json({ loggedIn: false, status: "something went wrong, please try again later." })
  }
  jwtVerify(token, process.env.JWT_SECRET, (error, decoded) => {

  }).then(() => {

    res.json({ loggedIn: true, token })
  }).catch((error) => {
    console.log(error)
    res.json({ loggedIn: false, status: "something went wrong, please try again later." })

  })

}


module.exports.handleLoginPOST = async (req, res) => {
  // Check the credentials
  const potentialLogin = await pool.query("SELECT passhash, id, userid FROM users WHERE username = $1;",
    [req.body.username])

  if (potentialLogin.rowCount === 0) {
    console.log("username doesn't exist")
    return res.json({ loggedIn: false, status: "Username doesn't exist" })
  }

  const isRightPassword = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
  if (isRightPassword) {
    console.log("logging in..")
    /* Replacing to jwt */
    jwtSign({
      username: req.body.username,
      id: potentialLogin.rows[0].id,
      userid: potentialLogin.rows[0].userid
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    }).then(token => {
      res.json({ loggedIn: true, token })
    }).catch(err => {
      console.log(err)
      res.json({ loggedIn: false, status: "something went wrong, please try again later." })
    })

  } else {
    console.log("incorrect password");
    res.json({ loggedIn: false, status: "Incorrect password" })

  }


}



module.exports.handleLogoutPOST = (req, res) => {
  console.log("GOT A LOGOUT");
  res.json({ loggedIn: false, status: "User logged out" })

}