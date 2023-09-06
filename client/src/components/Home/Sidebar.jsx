import {
    Button,
    Divider,
    HStack,
    Heading,
    Tab,
    TabList,
    VStack,
    Text,
    Circle,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendsContext } from "./Homepage";
import { AddFriendModal } from "./AddFriendModal";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const { friendsList, setFriendsList } = useContext(FriendsContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const handleLogoutForm = () => {
        fetch("http://localhost:3030/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate(0);
    };

    return (
        <>
            <VStack py={"1.5rem"} height={"100%"}>
                <HStack justifyContent={"center"} w={"100%"}>
                    <Heading size={"md"} marginInline={"0.25rem"}>Add Friend</Heading>
                    <Button onClick={onOpen} marginInline={"0.25rem"}>
                        <AddIcon />
                    </Button>
                </HStack>
                <Divider />

                <VStack as={TabList} >
                    {/* <HStack as={Tab}>
                <Circle bg={"green.500"} w={"15px"} h={"15px"} />

                    <Text>John Smith</Text>
                </HStack> */}
                    {friendsList.map((friend) => (
                        <HStack
                            as={Tab}
                            key={`friend:${friend.username}`}
                            justifyContent={"center"}
                            w={"100%"}
                            padding={"0.25rem 1rem 0.25rem 1rem"}
                            my={".25rem"}
                            onClick={()=>{

                                let box = document.getElementById(`bottomDiv:${friend.userid}`);
                                box?.scrollIntoView({behavior: "instant"})
                    
                            }}
                        >
                            <Circle
                                bg={
                                    friend.connected === true
                                        ? "green.500"
                                        : "red.500"
                                }
                                w={"15px"}
                                h={"15px"}
                            />
                            <Text>{friend.username}</Text>
                            {console.log(friend.username + friend.connected)}
                        </HStack>
                    ))}
                </VStack>
                <VStack height={"100%"} justify={"flex-end"} opacity={"70%"} marginBottom={"1.5rem"}>
                    <Button onClick={handleLogoutForm} colorScheme={"red"}>Logout</Button> 

                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
