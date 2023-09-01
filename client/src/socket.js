import {io} from "socket.io-client"


const socket = new io(process.env.REACT_APP_SERVER_URL,{
  // the socket should NOT connect to the backend when user is not logged in
  autoConnect:false,

  // send all cookies with the socket connection
  withCredentials:true,
  
})
console.log("this is the urllllllllllll")
console.log(process.env.REACT_APP_SERVER_URL);


export default socket;