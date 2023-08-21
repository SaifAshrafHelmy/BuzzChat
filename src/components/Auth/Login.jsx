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

export const Login = () => {
  const navigate = useNavigate()

    return (
      <Formik
      initialValues= {{username:"", password:""}}

      validationSchema= {Yup.object({
        username: Yup.string()
        .required("Username required!"),


        password: Yup.string()
        .required("Password required!")

      })} 

      onSubmit= {(values,actions)=>{
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();}
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

            <Heading mb={"1.5rem"}>Login to BuzzChat</Heading>

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


            <ButtonGroup
                pt={"1rem"}
                gap={"2rem"}
            >
                <Button colorScheme="teal" type="submit">Login</Button>
                <Button onClick={()=> navigate("/register")}>Create Account</Button>
            </ButtonGroup>
        </VStack>

        </Formik>
    );
};
