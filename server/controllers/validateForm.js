const Yup = require("yup")

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(4, "Username too short!")
    .max(28, "Username too long!"),

  password: Yup.string()
    .required("Password required!")
    .min(8, "Password too short!")
    .max(28, "Password too long!")

})




const validateForm = (req, res, next) => {

  const formData = req.body;
  formSchema.validate(formData)
    .then(valid => {
      if (valid) {
        console.log(`-------------- VALID AUTH FORM DATA (YUP) -----------`)
        console.log(valid)
        next()
        // res.status(200).json(`Successful ${authType}`)

      }
    })
    .catch(err => {
      console.log("-------------- ERROR -----------")
      console.error(err.errors)
      res.status(400).json(`INVALID AUTH FORM DATA (YUP)`)

    })


}





module.exports = validateForm