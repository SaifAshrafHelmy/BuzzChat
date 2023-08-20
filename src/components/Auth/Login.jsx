import {
    VStack,
    ButtonGroup,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup"

export const Login = () => {
    const formik = useFormik({
      initialValues: {username:"", password:""},
      validationSchema: Yup.object({
        username: Yup.string()
        .required("Username required!")
        .min(6, "Username too short!")
        .max(28, "Username too long!"),
        password: Yup.string()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!")
      }),
      onSubmit: (values,actions)=>{
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }

    })

    return (
        <VStack
            as={"form"}
            w={{ base: "90%", md: "500px" }}
            m={"auto"}
            justify={"center"}
            h={"100vh"}
            spacing={"1.5rem"}
            onSubmit={formik.handleSubmit}
        >

            <Heading mb={"1.5rem"}>Login to BuzzChat</Heading>

            <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                <FormLabel fontSize={"lg"}>Username</FormLabel>
                <Input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    autoComplete="off"
                    size={"lg"}
                    
                    {...formik.getFieldProps("username")}
                ></Input>
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                <FormLabel fontSize={"lg"}>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    size={"lg"}
                  
                    {...formik.getFieldProps("password")}
                ></Input>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <ButtonGroup
                pt={"1rem"}
                gap={"2rem"}
            >
                <Button colorScheme="teal" type="submit">
                    Login
                </Button>
                <Button>Create Account</Button>
            </ButtonGroup>
        </VStack>
    );
};
