import {io} from "socket.io-client"


const socket = user =>  new io("http://localhost:3030",{
  // the socket should NOT connect to the backend when user is not logged in
  autoConnect:false,

  // send all cookies with the socket connection
  withCredentials:true,
  auth:{
    token: user.token
  }

})


export default socket;