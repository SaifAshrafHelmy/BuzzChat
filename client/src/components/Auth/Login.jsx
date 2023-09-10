import { VStack, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../TextField";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

export const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(AccountContext)
    const [error, setError ]= useState(null)


    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required("Username required!")
                    .min(4, "Username too short!")
                    .max(28, "Username too long!"),

                password: Yup.string()
                    .required("Password required!")
                    .min(8, "Password too short!")
                    .max(28, "Password too long!"),
            })}
            onSubmit={(values, actions) => {
                // alert(JSON.stringify(values, null, 2));
                const vals = { ...values };
                // actions.resetForm();

                fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",

                    },
                    body: JSON.stringify(vals),
                })
                    .catch((err) => {
                        return;
                    })
                    .then((res) => {
                        if (!res ) {
                            return;
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (!data) return;
                        setUser({...data})

                        if(data.status) {setError(data.status)}
                        console.log(data);
                        if(data.loggedIn){
                            localStorage.setItem("token", data.token)
                            navigate("/home")
                        }
                    });
            }}
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

                <Text as={"p"} color={"red.500"}>{error}</Text>


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

                <ButtonGroup pt={"1rem"} gap={"2rem"}>
                    <Button colorScheme="teal" type="submit">
                        Login
                    </Button>
                    <Button onClick={() => navigate("/register")}>
                        Create Account
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    );
};
