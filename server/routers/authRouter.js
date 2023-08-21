const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()



router.post("/register", (req, res) => {
  validateForm(req,res,"REGISTER")

})

router.post("/login", (req, res) => {
  validateForm(req,res,"LOGIN")

})


module.exports = router