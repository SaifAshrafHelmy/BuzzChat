const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")


router.post("/register", async (req, res) => {
  validateForm(req, res, "REGISTER")

  // check for username uniqueness 
  const existingUsername = await pool.query("SELECT username FROM users WHERE username = $1;", [req.body.username])
  if (existingUsername.rowCount === 0) {
    // register
    console.log("username is unique");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash) VALUES($1, $2) RETURNING id, username;", 
    [req.body.username, hashedPassword])
    req.session.user = {
      username:req.body.username,
      id: newUserQuery.rows[0].id,
    }
    res.json({ loggedIn: true, username:req.body.username })

  } else {
    // return message
    console.log("username already exists");
    res.json({ loggedIn: false, status: "Username already exists!" })
  }
})

router.post("/login", async (req, res) => {
  validateForm(req, res, "LOGIN")
  // Check the credentials
  const potentialLogin = await pool.query("SELECT passhash, id FROM users WHERE username = $1;", 
  [req.body.username])
  
  if(potentialLogin.rowCount ===0){
    console.log("username doesn't exist")
    return res.json({loggedIn: false, status: "Username doesn't exist"})
  }
  
  const isRightPassword = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
  if(isRightPassword){
    console.log("loggin in..")
    
    req.session.user = {
      username:req.body.username,
      id: potentialLogin.rows[0].id,
    }
    res.json({ loggedIn: true, username:req.body.username })


  }else{
    console.log("incorrect password");
     res.json({loggedIn: false, status: "Incorrect password"})

  }
  

})


module.exports = router