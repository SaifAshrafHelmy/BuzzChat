import { Route, Routes } from "react-router-dom"
import {Login} from "./Auth/Login"
import { SignUp } from "./Auth/SignUp"
import PrivateRoutes from "./PrivateRoutes"
import { useContext } from "react"
import { AccountContext } from "./AccountContext"
import { Text } from "@chakra-ui/react"
import { SpinnerIcon } from "@chakra-ui/icons"

export const Views = () => {
  const{user} = useContext(AccountContext)
  console.log("user is", user)
  
    return user.loggedIn===null? 
    (
      <>
      <Text>Loading... </Text>
      <SpinnerIcon/>
      </>
    ) : (
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<SignUp/>}> </Route>
        
        <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={<h2>Hi! Welcome to our homepage!</h2>}> </Route>
        </Route>




        <Route path="*" element={<Login/>}> </Route>
      </Routes>
    )
  }
  