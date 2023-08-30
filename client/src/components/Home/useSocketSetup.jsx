import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendsList) => {
    const { setUser } = useContext(AccountContext);
    useEffect(() => {
        socket.connect();
        socket.on("friends", (friends)=>{
            setFriendsList(friends);
            console.log(`here are your friendssss`);
            console.log(friends)

        })
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
        };

        // dummy dependency that doesn't change
    }, [setUser]);
};

export default useSocketSetup;
