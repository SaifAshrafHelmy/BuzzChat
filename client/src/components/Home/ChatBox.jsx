import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import socket from "../../socket";
import { useContext } from "react";
import { MessagesContext, SocketContext } from "./Homepage";

export const ChatBox = ({ userid }) => {
  const {setMessages} = useContext(MessagesContext)
  const {socket} = useContext(SocketContext)
    return (
        <Formik
            initialValues={{ message: "" }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255),
            })}
            onSubmit={(values, actions) => {
              if (values.message.trim().length === 0) {
                return;
              }
                const message = {
                    to: userid,
                    from: null,
                    content: values.message,
                };
                
                setMessages(prevMsgs => [message, ...prevMsgs])
                console.log(JSON.stringify(message));
                socket.emit("dm", message);


                let box = document.getElementById(`bottomDiv:${userid}`);
                box?.scrollIntoView({behavior: "instant"})


                actions.resetForm();


            }}
        >
            <HStack as={Form} w={"100%"} pb="1.4rem" px="1.4em">
                <Input
                    as={Field}
                    name="message"
                    placeholder="Type messages here.."
                    size="lg"
                    autoComplete="off"
                />
                <Button type="submit" size="lg" colorScheme="teal">
                    Send
                </Button>
            </HStack>
        </Formik>
    );
};
