const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()

const { handleLoginGET, handleLoginPOST, handleRegisterPOST } = require('../controllers/authController')


router.route("/register")
.post( validateForm, handleRegisterPOST)

router.route("/login")
  .get(handleLoginGET)
  .post( validateForm, handleLoginPOST )


router.route("/logout")
  .post( (req,res)=>{
    console.log("GOT A LOGOUT");
    req.session.destroy()
    res.json({ loggedIn: false, status: "User logged out" })

  } )




module.exports = router