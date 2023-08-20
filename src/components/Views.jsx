import { Route, Routes } from "react-router-dom"
import {Login} from "./Auth/Login"
import { SingUp } from "./Auth/SingUp"

export const Views = () => {
    return (
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<SingUp/>}> </Route>



        <Route path="*" element={<Login/>}> </Route>
      </Routes>
    )
  }
  