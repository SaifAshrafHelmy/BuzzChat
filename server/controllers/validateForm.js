const Yup = require("yup")

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(5, "Username too short!")
    .max(28, "Username too long!"),

  password: Yup.string()
    .required("Password required!")
    .min(8, "Password too short!")
    .max(28, "Password too long!")

})




const validateForm = (req, res, authType) => {
  console.log(`got a ${authType} request`)

  const formData = req.body;
  formSchema.validate(formData)
    .then(valid => {
      if (valid) {
        console.log(`-------------- VALID ${authType} REQUEST -----------`)
        console.log(valid)
        // res.status(200).json(`Successful ${authType}`)

      }
    })
    .catch(err => {
      console.log("-------------- ERROR -----------")
      console.error(err.errors)
      res.status(400).json(`${authType} Failed!`)

    })


}





module.exports = validateForm