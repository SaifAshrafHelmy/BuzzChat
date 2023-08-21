import { Route, Routes } from "react-router-dom"
import {Login} from "./Auth/Login"
import { SignUp } from "./Auth/SignUp"

export const Views = () => {
    return (
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<SignUp/>}> </Route>



        <Route path="*" element={<Login/>}> </Route>
      </Routes>
    )
  }
  