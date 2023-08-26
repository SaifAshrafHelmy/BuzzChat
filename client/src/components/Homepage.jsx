import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";



export const Homepage = () => {
  const navigate = useNavigate();

  
  const handleLogoutForm = ()=>{
    fetch("http://localhost:3030/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
      },
  })
  navigate(0)
}

  return (
    <>

      <h2>Hi! Welcome to our homepage!</h2>
      <Button onClick={handleLogoutForm} colorScheme='red' >Logout</Button>

      

    </>
  )
}
