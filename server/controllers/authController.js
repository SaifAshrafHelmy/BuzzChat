const pool = require("../db")
const bcrypt = require("bcrypt")

module.exports.handleRegisterPOST = async(req,res)=>{
  
  // check for username uniqueness 
  const existingUsername = await pool.query("SELECT username FROM users WHERE username = $1;", [req.body.username])
  if (existingUsername.rowCount === 0) {
    // register
    console.log("username is unique");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash) VALUES($1, $2) RETURNING id, username;",
      [req.body.username, hashedPassword])
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    }
    res.json({ loggedIn: true, username: req.body.username })

  } else {
    // return message
    console.log("username already exists");
    res.json({ loggedIn: false, status: "Username already exists!" })
  }
}








module.exports.handleLoginGET = (req, res) => {
  console.log(req.session)
  if (req.session.user && req.session.user.username) {
    console.log("logged in bro")
    res.json({ loggedIn: true, username: req.session.username })
  }
  else {
    console.log("not logged in bro");
    res.json({ loggedIn: false })
  }

}


module.exports.handleLoginPOST = async(req,res)=>{
    // Check the credentials
    const potentialLogin = await pool.query("SELECT passhash, id FROM users WHERE username = $1;",
      [req.body.username])

    if (potentialLogin.rowCount === 0) {
      console.log("username doesn't exist")
      return res.json({ loggedIn: false, status: "Username doesn't exist" })
    }

    const isRightPassword = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
    if (isRightPassword) {
      console.log("loggin in..")

      req.session.user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
      }
      res.json({ loggedIn: true, username: req.body.username })


    } else {
      console.log("incorrect password");
      res.json({ loggedIn: false, status: "Incorrect password" })

    }


  }



  module.exports.handleLogoutPOST = (req,res)=>{
    console.log("GOT A LOGOUT");
    req.session.destroy()
    res.json({ loggedIn: false, status: "User logged out" })

  }