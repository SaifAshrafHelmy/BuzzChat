import { useNavigate } from "react-router-dom";
import { Button, Grid, GridItem, Tabs } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./useSocketSetup";

export const FriendsContext = createContext();
export const MessagesContext = createContext();
export const Homepage = () => {
    const [friendsList, setFriendsList] = useState([]);
    console.log(friendsList[0])
    const [messages, setMessages] = useState([]);
    const [friendIndex, setFriendIndex] = useState(0);
    const navigate = useNavigate();
    useSocketSetup(setFriendsList, setMessages);

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
        <FriendsContext.Provider value={{ friendsList, setFriendsList }}>
            <Grid
                as={Tabs}
                templateColumns={"repeat(10, 1fr)"}
                height={"100vh"}
                onChange={(index) => setFriendIndex(index)}
            >
                <GridItem colSpan={"3"} borderRight={"1px solid grey"}>
                    <Sidebar />
                </GridItem>

                <GridItem colSpan={"7"} maxH={"100vh"}>
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <Chat  userid={friendsList[friendIndex]?.userid} />
                    </MessagesContext.Provider>
                </GridItem>

                {/* 
      <h2>Hi! Welcome to our homepage!</h2>
    <Button onClick={handleLogoutForm} colorScheme='red' >Logout</Button> */}
            </Grid>
        </FriendsContext.Provider>
    );
};
