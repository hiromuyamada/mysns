import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material"
import firebase from "firebase";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

   
export const AddCategory = () =>{
    const [categoryName,setCategoryName] = useState();
    const history = useNavigate();

    const handleClick = () => {
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`categories`);
        ref.add({
            categoryName,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),  
        }).then((docRef) =>{
            console.log('created!',docRef.id);
        }).catch((error)=>console.log("Error",error));
    }

    // useEffect(()=>{
    //     const asy = async ()=> {
    //         const currentUser = await firebase.auth();
    //         if(currentUser.currentUser.email != 'admin@admin.com'){
    //             alert("アクセス権限がありません。");
    //             history('../../threads');
    //         }
    //     }
    //     asy();
    // },[]);

    return(
    <Card className="mt-5" variant="outlined" sx={{width:'300px',margin:'auto',padding:'10px'}}>
    <CardHeader title="新規カテゴリ追加" />
    <CardContent>
        <TextField fullWidth label="カテゴリ名" value={categoryName} onChange={(val)=> setCategoryName(val.target.value)} />
        <Button className="mt-3" variant='outlined'
        onClick={handleClick}
        >送信</Button>
    </CardContent>
    </Card>
    )
}