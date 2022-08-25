import { useEffect, useState } from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export const MyPage = () =>{
    const [me,setMe] = useState();
    const history = useNavigate();
    useEffect(()=>{
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user);
                setMe(user);
            }else{
                history('../login');
            }
        });
        return unsubscribe;
      },[]);

      return(
        <Typography>
            {me.email}
        </Typography>
      )
}