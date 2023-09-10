const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()

const { handleLoginGET, handleLoginPOST, handleRegisterPOST, handleLogoutPOST } = require('../controllers/authController')
const { rateLimiter } = require('../controllers/rateLimiter')


router.all("/login", (req,res,next)=>{
  console.log("request headers aree..")
  console.log("request headers aree..")
  console.log("request headers aree..")
  console.log("request headers aree..")
  console.log("request headers aree..")
  console.log(req.headers.authorization)
  next()

})

router.route("/register")
  .post(rateLimiter(60,5), validateForm, handleRegisterPOST)

router.route("/login")
  .get(handleLoginGET)
  .post(rateLimiter(60,10), validateForm, handleLoginPOST)


router.route("/logout")
  .post(handleLogoutPOST)




module.exports = router