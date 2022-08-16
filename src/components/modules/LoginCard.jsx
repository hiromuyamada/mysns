import { Box, Button,Card,CardContent,CardHeader,TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { useEffect, useState } from "react";

export const LoginCard = (props) =>{ 
    const {title,link} = props.labels;
    const path = props.path;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useNavigate();

    useEffect(()=>{
       const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                history("../../threads");
            }
        });
        return unsubscribe;
    },[]);

    function handleClick(){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const { user } = userCredential;
            history("../../threads");
        })
        .catch((error) => {
            alert("メールアドレスまたはパスワードが正しくありません。");
        });
    }

    return(
            <Card variant="outlined" style={{width:'300px',margin:'auto',padding:'10px'}}>
            <CardHeader title={title} />
            <CardContent>
                <TextField fullWidth label="email" value={email} onChange={(val)=> setEmail(val.target.value)} />
                <TextField className="mt-2" fullWidth label="Password" value={password} onChange={(val)=> setPassword(val.target.value)}/>
                <Button className="mt-3" variant='outlined'
                onClick={handleClick}
                >送信</Button>
                <p className="mt-3"><a href={path}>{link}</a></p>
            </CardContent>
            </Card>
    );
}
