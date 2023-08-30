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
import { ChatIcon } from "@chakra-ui/icons";
import { useDisclosure } from '@chakra-ui/react'
import { useContext } from "react";
import { FriendsContext } from "./Homepage";
import { AddFriendModal } from "./AddFriendModal";


export const Sidebar = () => {
    const { friendsList, setFriendsList } = useContext(FriendsContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <VStack py={"1.5rem"}>
                <HStack justifyContent={"space-evenly"} w={"100%"}>
                    <Heading size={"md"}>Add Friend</Heading>
                    <Button onClick={onOpen} >
                        <ChatIcon />
                    </Button>
                </HStack>
                <Divider />

                <VStack as={TabList}>
                    {/* <HStack as={Tab}>
                <Circle bg={"green.500"} w={"15px"} h={"15px"} />

                    <Text>John Smith</Text>
                </HStack> */}
                    {friendsList.map((friend) => (
                        <HStack as={Tab} key={friend.username} justifyContent={"flex-start"} w={"100%"}>
                            <Circle
                                bg={friend.connected === true ? "green.500" : "red.500"}
                                w={"15px"}
                                h={"15px"}
                            />
                            <Text>{friend.username}</Text>
                            {console.log(friend.username + friend.connected)}
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose}/>
        </>
    );
};
