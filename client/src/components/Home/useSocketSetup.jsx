import { useContext, useEffect, useRef } from "react";
// import socket from "../../socket";
import { AccountContext } from "../AccountContext";
import { SocketContext } from "./Homepage";

const useSocketSetup = (setFriendsList, setMessages, socket) => {
    const { setUser } = useContext(AccountContext);

    const initialized = useRef(false)


    useEffect(() => {

        socket.connect();
        socket.on("friends", (friends)=>{
            setFriendsList(friends);
            console.log(`here are your friendssss`);
            console.log(friends)

        })
        socket.on("messages", (messages)=>{
            setMessages(messages);
            console.log(`here are your messages`);
            console.log(messages)

        })

        if (!initialized.current) {
            // just for limiting useEffect running twice in strict mode..
            initialized.current = true
            socket.on("dm", message => {
                console.log(message)
                setMessages(prevMessages => [message, ...prevMessages])
            })
                
        }
     
        socket.on("connected", (connectionStatus, username)=>{
            setFriendsList(prevFriends => {
                return [...prevFriends].map(friend => {
                    if(friend.username===username){
                        friend.connected = connectionStatus;
                    }
                    return friend;
                })
            })
        })

        socket.on("connect_error", () => {
            // log user out if they can't connect to the server
            setUser({ loggedIn: false });
        });
      

        // clean up (do this when component unmounts)
        return () => {
            // to prevent establishing multiple listeners and memory leaks.
            // This function removes the "connect_error" event listener when component unmounts.
            socket.off("connect_error");
            socket.off("connected");
            socket.off("friends");
            socket.off("messages");
        };

        // dummy dependency that doesn't change
    }, [setUser, setFriendsList, setMessages, socket]);
};

export default useSocketSetup;
