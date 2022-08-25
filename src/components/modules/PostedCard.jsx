import {Box, Button, Card, CardContent,IconButton,Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import firebase from "firebase";

export const PostedCard = (props) =>{
    const {username,content,time,isMyPost ,id} = props;
    //削除(自身の投稿のみ有効)
    const doDelete = (id) =>{
        const {currentUser} = firebase.auth();
        if(currentUser){
            const db = firebase.firestore();
            const ref = db.collection(`posts`).doc(id);
            ref.delete().catch(()=>{
                alert('削除に失敗しました。\nもう一度お試しください。')
            })
        }
    }
    return(
        <Card variant="outlined" className="border-2 mb-4">
            <CardContent sx={{textAlign:"left"}}>
                <Typography variant="h5">
                    {username}
                </Typography>

                <Typography className="mt-3 mb-1">
                    {content}
                 </Typography>

                 <Typography variant="p">
                    {time}
                 </Typography>
                 {isMyPost &&
                    <IconButton onClick={()=>doDelete(id)} sx={{float:'right',color:'red'}}>
                      <DeleteForeverIcon />
                    </IconButton>      
                 }
            </CardContent>
        </Card>
);
}