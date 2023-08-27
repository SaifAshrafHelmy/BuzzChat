import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendsContext } from "./Homepage";

export const Chat = () => {
    const { friendsList } = useContext(FriendsContext);
    return friendsList.length > 0 ? (
        <VStack>
            <TabPanels>
                <TabPanel>Hi 1</TabPanel>
                <TabPanel>Hi 2</TabPanel>
                <TabPanel>Hi 3</TabPanel>
            </TabPanels>
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
                <Text>
                    You don't have any friends yet, Click add friends to start.
                </Text>
            </TabPanels>
        </VStack>
    );
};
