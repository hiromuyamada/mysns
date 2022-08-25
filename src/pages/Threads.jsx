import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { MenuList } from "../components/modules/MenuList";
import { PostedCard } from "../components/modules/PostedCard";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import firebase from "firebase";
import { UseTimestampToDate } from "../hooks/useTimestampToDate";

export const Threads = () =>{

    const [isOpen,setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const iconButtonStyle = {
        width:"5em",
        height:"5em",
        textAlign:"right",
        color:"#fd7e14",
        borderRadius:"2em",
        opacity:!isOpen ? "1" : ".8"
    }

    const slideUpStyle = {
        bottom: !isOpen ? "-1000px":"0",
        opacity:!isOpen ? "0":"1",
        transition:"300ms",
        position:"fixed",
    }

    //投稿する
    const [bodyText,setBodyText] = useState('');
    const handleClick = () => {
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/posts`);
        ref.add({
            userName:currentUser.email,
            bodyText,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),  
        }).then((docRef) =>{
            console.log('created!',docRef.id);
        }).catch((error)=>console.log("Error",error));
    }

    //DBから投稿取得
    useEffect(()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        let unsubscribe = () =>{};
        // if(currentUser){
            const ref = db.collection(`users/${currentUser.uid}/posts`).orderBy('createdAt','desc');
            unsubscribe = ref.onSnapshot((snapshot)=>{
                const userPosts = [];
                snapshot.forEach((doc)=>{
                    console.log(doc.id,doc.data());
                    const data = doc.data();
                    userPosts.push({
                        id:doc.id,
                        username:data.userName,
                        bodyText:data.bodyText,
                        createdAt:UseTimestampToDate(data.createdAt.seconds),
                        // createdAt:dayjs(data.createdAt.seconds).format('YYYY/MM/DD HH:mm'),
                    });
                });
                setPosts(userPosts);
                // console.log(posts);
            },(error) => {
                console.log(error);
                alert('データの読み込みに失敗しました。');
            });
        // }
        return unsubscribe;
    },[]);

    return(
        <>
        <Grid container className="mt-5">
            <Grid item xs={2} className="h-100">
                <Box className="text-center">
                    <Card variant="outlined">
                        <CardContent>
                            <List>
                                <ListItem sx={{borderBottom:'1px solid #fd7e14'}}>
                                    <ListItemText primary='カテゴリ一覧' />
                                </ListItem>
                                <MenuList text='ちゃん１' />
                                <MenuList text='ちゃん2' />
                                <MenuList text='夏のちゃん' />
                                <MenuList text='しとーんず' />
                                <MenuList text='おねむちゃん' />
                            </List>
                    </CardContent>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={10}>
                <Box className="w-75 m-auto">
                    {posts.map((post)=>{
                        console.log(post);
                       return  (
                        <PostedCard 
                        username={post.username} 
                        content={post.bodyText}  
                        time={post.createdAt} />
                        )}
                    )}
                </Box>
                <Box style={{textAlign:"right",position:"fixed",bottom:"5em",right:"5em"}}>
                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                        {!isOpen?
                        <AddCircleRoundedIcon style={iconButtonStyle} />
                        :
                        <CancelRoundedIcon style={iconButtonStyle} />
                        }
                    </IconButton>
                </Box>   
                <Grid container>    
                    <Grid item xs={2} />        
                    <Grid item xs={10}>     
                        <Box className="w-50 m-auto" style={slideUpStyle}>
                            <Card variant="outlined">
                                <CardContent className="text-center">
                                    <TextField value={bodyText} onChange={(val)=>setBodyText(val.target.value)} fullWidth label="投稿する" multiline rows={6}/>
                                    <Button className="mt-3" variant='outlined' onClick={handleClick}>送信</Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>   
                </Grid> 
            </Grid>
        </Grid>

        </>
    );
}