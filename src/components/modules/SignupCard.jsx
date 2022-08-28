import { Box, Button,Card,CardContent,CardHeader,TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { useState } from "react";

export const SignupCard = (props) =>{ 
    const {title,link} = props.labels;
    const path = props.path;
    const [email,setEmail] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const history = useNavigate();

    function handleClick(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const { user } = userCredential;
            user.updateProfile({
                displayName:username
            })
            alert("ユーザー登録が完了しました。\nログインしてお楽しみください");
            history("../../login");
        })
        .catch((error) => {
            alert("メールアドレスまたはパスワードの形式が不正です。\nパスワードは6文字以上で入力してください。");
        });
    }

    return(
            <Card variant="outlined" style={{width:'300px',margin:'auto',padding:'10px'}}>
            <CardHeader title={title} />
            <CardContent>
                <TextField fullWidth label="email" value={email} onChange={(val)=> setEmail(val.target.value)} />              
                <TextField className="mt-2" fullWidth label="ニックネーム" value={username} onChange={(val)=> setUserName(val.target.value)}/>
                <TextField type={'password'} className="mt-2" fullWidth label="Password" value={password} onChange={(val)=> setPassword(val.target.value)}/>
                <Button className="mt-3" variant='outlined'
                onClick={handleClick}
                >送信</Button>
                <p className="mt-3"><a href={path}>{link}</a></p>
            </CardContent>
            </Card>
    );
}
