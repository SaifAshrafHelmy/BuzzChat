const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const { handleLoginGET, handleLoginPOST, handleRegisterPOST } = require('../controllers/authController')


router.route("/register")
.post( validateForm, handleRegisterPOST)

router.route("/login")
  .get(handleLoginGET)
  .post( validateForm, handleLoginPOST )


module.exports = router