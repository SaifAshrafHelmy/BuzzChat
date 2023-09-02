import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// the context
export const AccountContext = createContext();


// the component
const UserContext = ({ children }) => {
    const [user, setUser] = useState({ loggedIn: null });
    const navigate = useNavigate();

    // run get request to /login each time
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        credentials: "include",
      })
      .catch(err => {
        return setUser({loggedIn: false})
      })
      .then(res =>{
        if(!res || !res.ok || res.status>=400){
        return setUser({loggedIn: false})
        }
        return res.json();
      })
      .then(data =>{
        // console.log("data is", data);
        if(!data) return setUser({loggedIn: false})
        setUser({...data})
        navigate("/home")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    );
};

export default UserContext;
