import {Box, Button, Card, CardContent,IconButton,Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import firebase from "firebase";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState } from "react";

export const PostedCard = (props) =>{
    const {username,content,time,isMyPost ,id,replyTo,setReplyTo,setIsOpen,hasReply,displayReply} = props;
    //削除(自身の投稿のみ有効)
    const doDelete = (id) =>{
        if(window.confirm('削除してよろしいですか？')){
            const {currentUser} = firebase.auth();
            if(currentUser){
                const db = firebase.firestore();
                const ref = db.collection(`posts`).doc(id);
                ref.delete().catch(()=>{
                    alert('削除に失敗しました。\nもう一度お試しください。')
                })
            }
        }
    }

    const postCardStyle = {
        borderRadius:"10px",
        boxShadow: "3px 3px 3px 0px rgba(0, 0, 0, 0.45)",
        "&:hover" : {
            transform: "translateY(-4px)",
            transition: "300ms",
          }
    }


        return(
            
            <Card variant="outlined" className="border-2 mb-4" sx={postCardStyle}>
                <CardContent sx={{textAlign:"left"}}>
                    <Box className="mb-3">
                    <AccountCircleRoundedIcon fontSize='medium' sx={{marginBottom:'6px',marginRight:'0.5rem',verticalAlign:"middle"}} />
                    <Typography variant="h6" className="fw-bold" sx={{display:'inline'}}>
                        {username}
                    </Typography>
                    {isMyPost &&
                        <IconButton onClick={()=>doDelete(id)} sx={{float:'right',color:'red'}}>
                        <DeleteForeverIcon />
                        </IconButton>      
                    }
                    </Box>
                    {replyTo &&
                    <Typography className="mt-3" sx={{color:"#1976d2"}}>
                        &gt;&gt;@{replyTo.username}
                    </Typography>
                    }
                    <Typography className="mt-1 mb-4 text-break">
                        {content}
                    </Typography>

                    <Typography variant="p" className="mt-5 text-muted">
                        {time}
                    </Typography>
                    <Box variant="span" sx={{float:"right"}}>
                    {!replyTo &&
                    <Button variant="outlined" onClick={()=>{
                        setReplyTo({id,username});
                        setIsOpen(true)     
                    }}>返信する</Button>
                    }
                    {hasReply &&
                        <Button variant="outlined" className="ms-2" onClick={()=>{displayReply(id);}}>
                            返信を表示
                        </Button>
                    }
                    </Box>
                </CardContent>
            </Card>
            
        );
                
}