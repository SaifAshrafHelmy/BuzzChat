import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Heading,
} from "@chakra-ui/react";
import { TextField } from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useCallback, useContext, useState } from "react";
import { FriendsContext } from "./Homepage";


export const AddFriendModal = ({ isOpen, onClose }) => {
    const [error, setError] = useState(null);
    const {setFriendsList} = useContext(FriendsContext);
    const handleCloseModal = useCallback(() => {
        onClose();
        setError("");
    }, [onClose]);

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Add a friend!</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: "" }}
                    validationSchema={Yup.object({
                        friendName: Yup.string()
                            .required("friend username required!")
                            .min(4, "Invalid username!")
                            .max(28, "Invalid username!"),
                    })}
                    onSubmit={(values, actions) => {
                        // alert(JSON.stringify(values, null, 2))
                        // actions.resetForm();
                        // onClose()
                        socket.emit(
                            "add_friend",
                            values.friendName,
                            ({ errorMessage, done, newFriend }) => {
                                console.log("done?", done);
                                if (done) {
                                    handleCloseModal();
                                    setFriendsList(c=> [newFriend, ...c])
                                    return;
                                } else setError(errorMessage);
                            }
                        );
                    }}
                >
                    <Form>
                        <ModalBody>
                            <Heading
                                as={"p"}
                                fontSize="xl"
                                color={"red.500"}
                                textAlign={"center"}
                                my={"20px"}
                            >
                                {error}
                            </Heading>
                            <TextField
                                type="text"
                                name="friendName"
                                placeholder="Enter Username"
                                autoComplete="off"
                                size={"lg"}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};
