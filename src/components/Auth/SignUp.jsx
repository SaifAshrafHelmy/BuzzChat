import {
  VStack,
  ButtonGroup,
  Button,
  Heading,
  
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";



export const SignUp = () => {
  const navigate = useNavigate();


  return (
    <Formik
    initialValues= {{username:"", password:"", password_confirmation:""}}

    validationSchema= {Yup.object({
      username: Yup.string()
      .required("Username required!")
      .min(5, "Username too short!")
      .max(28, "Username too long!"),

      password: Yup.string()
      .required("Password required!")
      .min(8, "Password too short!")
      .max(28, "Password too long!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        "Password must contain both letters and numbers!"
      ),

      password_confirmation: Yup.string()
      .required("Password Confirmation required!")
      .oneOf([Yup.ref('password'), null], "Passwords don't match!")
      
    })} 

    onSubmit= {(values,actions)=>{

      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
    }
    >

      

    
      <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m={"auto"}
          justify={"center"}
          h={"100vh"}
          spacing={"1.5rem"}
      >

          <Heading mb={"1.5rem"}>Sign Up to BuzzChat</Heading>

          <TextField  
                type="text"
                name="username"
                placeholder="Enter Username"
                autoComplete="off"
                size={"lg"}
          />
          <TextField  
                type="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="off"
                size={"lg"}
          />
          <TextField  
                type="password"
                name="password_confirmation"
                placeholder="Enter Password Again"
                autoComplete="off"
                size={"lg"}
          />
          


          <ButtonGroup
              pt={"1rem"}
              gap={"2rem"}
          >
              <Button colorScheme="teal" type="submit" 

              >Sign up</Button>
              <Button onClick={()=> navigate("/")} leftIcon={<ArrowBackIcon/>}  >Back </Button>
          </ButtonGroup>
      </VStack>

      </Formik>
  );
}
