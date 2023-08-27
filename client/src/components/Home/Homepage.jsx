import { useNavigate } from "react-router-dom";
import { Button, Grid, GridItem, Tabs } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import {Chat}  from "./Chat";
import { createContext, useState } from "react";


export const FriendsContext = createContext()
export const Homepage = () => {
  const [friendsList, setFriendsList ] = useState([
    {username: "Ahmed Osama", connected:false},
    {username: "Menna Kosbar", connected:true},
    {username: "Nada Gebreel", connected:false},
  ])
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
      <FriendsContext.Provider value={{friendsList, setFriendsList}}>
     

        <Grid as={Tabs} templateColumns={"repeat(10, 1fr)"} height={"100vh"}>

            <GridItem colSpan={"3"} borderRight={"1px solid grey"}>
                <Sidebar />
            </GridItem>

            <GridItem colSpan={"7"}>
                <Chat />
            </GridItem>

            {/* 
      <h2>Hi! Welcome to our homepage!</h2>
    <Button onClick={handleLogoutForm} colorScheme='red' >Logout</Button> */}
        </Grid>

      </FriendsContext.Provider>
    );
};
