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
import { useContext } from "react";
import { FriendsContext } from "./Homepage";

export const Sidebar = () => {
    const{friendsList, setFriendsList} = useContext(FriendsContext)
    return (
        <VStack py={"1.5rem"} >
            <HStack justifyContent={"space-evenly"} w={"100%"}>
                <Heading size={"md"}>Add Friend</Heading>
                <Button>
                    <ChatIcon />
                </Button>
            </HStack>
            <Divider />

            <VStack as={TabList}>
                
                {/* <HStack as={Tab}>
                <Circle bg={"green.500"} w={"15px"} h={"15px"} />

                    <Text>John Smith</Text>
                </HStack> */}
                {friendsList.map((friend)=>(
                    <HStack as={Tab}>
                        <Circle bg={friend.connected? "green.500":"red.500"} w={"15px"} h={"15px"} />
                        <Text>{friend.username}</Text>
                    </HStack>
                ))}
                

            </VStack>
        </VStack>
    );
};
