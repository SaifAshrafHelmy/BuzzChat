import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";
import { TextField } from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const AddFriendModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Add a friend!</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: "" }}
                    validationSchema={Yup.object({
                        friendName: Yup.string()
                            .required("friend username required!")
                            .min(5, "Invalid username!")
                            .max(28, "Invalid username!"),
                    })}
                    onSubmit={(values, actions) => {
                        // alert(JSON.stringify(values, null, 2))
                        // actions.resetForm();
                        onClose()
                    }}
                >
                    <Form>
                        <ModalBody>
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
