import { useEffect, useState } from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export const MyPage = () =>{
    const [me,setMe] = useState();
    const [email,setEmail] = useState();
    const [displayName,setDisplayName] = useState();

    const history = useNavigate();
    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                setMe(user);
                setEmail(user.email);
                setDisplayName(user.displayName);
            }else{
                history('../login');
            }
        });
        return unsubscribe;
      },[]);

      return(
        <>
            <Typography>
                {email}
            </Typography>
            <Typography>
                {displayName}
            </Typography>
        </>
      )
}