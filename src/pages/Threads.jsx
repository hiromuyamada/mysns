import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, InputBase, List, ListItem, ListItemText, OutlinedInput, TextField, Typography, useEventCallback } from "@mui/material";
import { MenuList } from "../components/modules/MenuList";
import { PostedCard } from "../components/modules/PostedCard";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import firebase from "firebase";
import { UseTimestampToDate } from "../hooks/useTimestampToDate";
import { useNavigate } from "react-router-dom";
import { CategoryList } from "../components/modules/CategoryList";
import SearchIcon from '@mui/icons-material/Search';

export const Threads = () =>{

    const [isOpen,setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('default');
    const [bodyText,setBodyText] = useState('');
    const [me,setMe] = useState('');
    const [searchWord,setSearchWord] = useState('');

    const history = useNavigate();

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
    const handleClick = () => {
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`posts`);
        ref.add({
            userName:currentUser.email,
            bodyText,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),  
            category:currentCategory,
            like:0,
        }).then((docRef) =>{
            console.log('created!',docRef.id);
            setBodyText('');
        }).catch((error)=>console.log("Error",error));
    }

    //DBから投稿取得
    useEffect(()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        let unsubscribe = () =>{};
        if(currentUser){
            setMe(currentUser);
            const ref = db.collection(`posts`).where('category','==',currentCategory).orderBy('createdAt','desc');
            unsubscribe = ref.onSnapshot((snapshot)=>{
                const userPosts = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    userPosts.push({
                        id:doc.id,
                        username:data.userName,
                        bodyText:data.bodyText,
                        createdAt:UseTimestampToDate(data.createdAt.seconds),
                    });
                });
                setPosts(userPosts);
            },(error) => {
                console.log(error);
                alert('データの読み込みに失敗しました。\nもう一度お試しください');
            });
        }
        else{
            history('../login');
        }
        return unsubscribe;
    },[currentCategory]);

    //投稿の検索
    const doSearchPosts = () =>{
        if(searchWord == ''){
            alert('検索するワードを入力してください。');
            return false;
        }else{
            const db = firebase.firestore();
            const ref = db.collection(`posts`).where('category','==',currentCategory).orderBy('createdAt','desc');
            let unsubscribe = () =>{};
            unsubscribe = ref.onSnapshot((snapshot)=>{
                const userPosts = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    if(~data.bodyText.indexOf(searchWord)){
                        userPosts.push({
                            id:doc.id,
                            username:data.userName,
                            bodyText:data.bodyText,
                            createdAt:UseTimestampToDate(data.createdAt.seconds),
                        });
                    }
                });
                setPosts(userPosts);
            },(error) => {
                console.log(error);
                alert('検索に失敗しました。。。\nもう一度お試しいただくか管理者にご連絡ください。');
            });
        }
    }

    return(
        <>
        <Grid container className="mt-5">
            <Grid item xs={2} className="h-100">
                <Box className="text-center">
                            <CategoryList setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} />
                </Box>
            </Grid>
            <Grid item xs={10}>
                <Box className="m-2">
                    <TextField
                        id="searchbox"
                        variant="outlined"
                        label="Search..."
                        sx={{padding:'1px'}}
                        size='small'
                        onChange={(val)=>setSearchWord(val.target.value)}
                    />               
                    <IconButton onClick={doSearchPosts} type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box className="w-75 m-auto">
                    {posts.map((post)=>{
                       return  (
                        <PostedCard 
                        key={post.id}
                        id={post.id}
                        username={post.username} 
                        content={post.bodyText}  
                        time={post.createdAt}
                        isMyPost={post.username == me.email ?true:false}
                        />
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
                                    <Button disabled={bodyText==''?true:false} className="mt-3" variant='outlined' onClick={handleClick}>送信</Button>
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