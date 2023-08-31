import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { FriendsContext, MessagesContext } from "./Homepage";
import { ChatBox } from "./ChatBox";

export const Chat = ({ userid }) => {
    const { friendsList } = useContext(FriendsContext);
    const { messages } = useContext(MessagesContext);

    useEffect(()=>{
        let box = document.getElementById("emptyBoxToScrollTo");
        box?.scrollIntoView({behavior: "instant"})
    })



    return friendsList.length > 0 ? (
        <VStack h={"100%"} justify={"end"}>
            <TabPanels overflowY={"scroll"} >
                {friendsList.map((friend) => (
                    <VStack
                        
                        flexDir={"column-reverse"}
                        as={TabPanel}
                        key={`chat:${friend.username}`}
                        width={"100%"}
                    >
                        <div  id="emptyBoxToScrollTo"/>
                        <div  id={`bottomDiv:${friend.userid}`} />

                        {messages
                            .filter(
                                (msg) =>
                                    msg.to === friend.userid ||
                                    msg.from === friend.userid
                            )
                            .map((msg, index) => (
                                <Text
                                    m={msg.to ===friend.userid? "1rem 0.25rem 0 auto !important":"1rem auto 0 0.25rem !important"}
                                    maxW={"50%"}
                                    key={`message:${friend.username}.${index}`}
                                    fontSize={"large"}
                                    bg={
                                        msg.to === friend.userid
                                            ? "green.200"
                                            : "gray.100"
                                    }
                                    color={"gray.800"}
                                    borderRadius={"10px"}
                                    padding={"0.5rem 1rem"}

                                >
                                    {msg.content}
                                </Text>
                            ))}
                    </VStack>
                ))}
            </TabPanels>
            <ChatBox userid={userid} />
        </VStack>
    ) : (
        <VStack
            justifyContent={"center"}
            pt={"5rem"}
            w={"100%"}
            textAlign={"center"}
            fontSize={"lg"}
        >
            <TabPanels>
                <TabPanel>
                    <Text>
                        You don't have any friends yet, Click Add Friend to
                        start.
                    </Text>
                </TabPanel>
            </TabPanels>
        </VStack>
    );
};
