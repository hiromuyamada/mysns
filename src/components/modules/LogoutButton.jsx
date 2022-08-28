import { Button } from "@mui/material"
import firebase from "firebase"
import { useNavigate } from "react-router-dom"

export const LogoutButton = ()=> {
    const history = useNavigate();
    const handleClick = ()=> {
        firebase.auth().signOut()
        .then(()=>{
            history('../../login');
        })
        .catch((error)=>{
            alert('ログアウトに失敗しました。');
        });
    };

    return(
        <Button onClick={handleClick} color="inherit" href='../../Login'>ログアウト</Button>
    );
}