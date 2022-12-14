import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, InputBase, List, ListItem, ListItemText, OutlinedInput, TextField, Typography, useEventCallback } from "@mui/material";
import { MenuList } from "../components/modules/MenuList";
import { PostedCard } from "../components/modules/PostedCard";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from "react";
import firebase from "firebase";
import { UseTimestampToDate } from "../hooks/useTimestampToDate";
import { useNavigate } from "react-router-dom";
import { CategoryList } from "../components/modules/CategoryList";
import SearchIcon from '@mui/icons-material/Search';

export const Threads = () =>{

    const [isOpen,setIsOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('');
    const [bodyText,setBodyText] = useState('');
    const [me,setMe] = useState('');
    const [searchWord,setSearchWord] = useState('');
    const [replyTo,setReplyTo] = useState(null);
    const [hasReplyPosts,setHasReplyPosts] = useState([]);
    const [isDisplayReplyMode, setIsDisplayReplyMode] = useState('false');
    const [reloadTrigger,setReloadTrigger] = useState('false');

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
        bottom: !isOpen ? "-1000px":"5px",
        opacity:!isOpen ? "0":"1",
        transition:"300ms",
        position:"fixed",
        width:"55%",
    }

    //投稿する
    const handleClick = () => {
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`posts`);
        ref.add({
            userName:currentUser.displayName,
            email:currentUser.email,
            bodyText,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),  
            category:currentCategory,
            like:0,
            replyTo,
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
                const repliedPosts = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    userPosts.push({
                        id:doc.id,
                        username:data.userName,
                        email:data.email,
                        bodyText:data.bodyText,
                        createdAt:UseTimestampToDate(data.createdAt.seconds),
                        replyTo:data.replyTo,
                    });
                    //リプライ投稿の場合、リプライ先の情報を保存
                    if(data.replyTo){
                        repliedPosts.push(data.replyTo.id);
                    }
                });
                setPosts(userPosts);
                setHasReplyPosts(repliedPosts);
            },(error) => {
                console.log(error);
                alert('データの読み込みに失敗しました。\nもう一度お試しください');
            });
            setIsDisplayReplyMode(false);
        }
        else{
            history('../login');
        }
        return unsubscribe;
    
    },[currentCategory,reloadTrigger]);

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
                    if(~data.bodyText.indexOf(searchWord) || ~data.userName.indexOf(searchWord)){
                        userPosts.push({
                            id:doc.id,
                            username:data.userName,
                            email:data.email,
                            bodyText:data.bodyText,
                            createdAt:UseTimestampToDate(data.createdAt.seconds),
                            replyTo:data.replyTo,
                            });
                    }
                });
                setPosts(userPosts);
                setIsDisplayReplyMode(false);
            },(error) => {
                console.log(error);
                alert('検索に失敗しました。。。\nもう一度お試しいただくか管理者にご連絡ください。');
            });
        }
    }

        //返信の表示
        const displayReply = async (id) =>{
            let unsubscribe = () =>{};
            const db = firebase.firestore();
            const userPosts = [];
            //返信元の取得(一番上に表示する)
            let ref = await db.collection(`posts`).doc(id).get();
                    const data = ref.data();
                    userPosts.push({
                        id:id,
                        username:data.userName,
                        email:data.email,
                        bodyText:data.bodyText,
                        createdAt:UseTimestampToDate(data.createdAt.seconds),
                        replyTo:data.replyTo,
                    });
                
            //返信の取得
            ref = db.collection(`posts`).where('replyTo.id','==',id).orderBy('createdAt','desc');
            unsubscribe = ref.onSnapshot((snapshot)=>{
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    userPosts.push({
                        id:doc.id,
                        username:data.userName,
                        email:data.email,
                        bodyText:data.bodyText,
                        createdAt:UseTimestampToDate(data.createdAt.seconds),
                        replyTo:data.replyTo,
                    });
                });
                setPosts(userPosts);
            })
            setIsDisplayReplyMode(true);
        }
    

    return(
        <>
        <Grid container className="mt-5">
            <Grid item xs={2} className="h-100">
                <Box className="text-center">
                            <CategoryList setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} />
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className="m-2">
                    {isDisplayReplyMode &&
                    <Button variant="outlined" className="me-5" onClick={()=>{setIsDisplayReplyMode(false);setReloadTrigger(!reloadTrigger);}}>
                            一覧に戻る
                    </Button>
                    }
                    <TextField
                        id="searchbox"
                        variant="outlined"
                        label="投稿を検索"
                        sx={{padding:'1px'}}
                        size='small'
                        onChange={(val)=>setSearchWord(val.target.value)}
                    />               
                    <IconButton onClick={doSearchPosts} type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Box className="w-75 m-auto">
                    {currentCategory == "" &&
                    <Typography className="mt-3">←カテゴリを選択してください</Typography>
                    }
                    {currentCategory != "" && posts.length==0 &&
                    <Typography className="mt-3">まだ投稿がありません。</Typography>
                    }
                    {posts.map((post)=>{
                       return  (
                        <PostedCard 
                        key={post.id}
                        id={post.id}
                        username={post.username} 
                        content={post.bodyText}  
                        time={post.createdAt}
                        isMyPost={post.email == me.email ?true:false}
                        replyTo={post.replyTo}
                        setReplyTo={setReplyTo}
                        setIsOpen={setIsOpen}
                        hasReply={hasReplyPosts.includes(post.id) ? true : false}
                        displayReply = {displayReply}
                        />
                        )}
                    )}
                </Box>
                <Box style={{textAlign:"right",position:"fixed",bottom:"5em",right:"5em"}}>
                    <IconButton onClick={() => {setIsOpen(!isOpen);setReplyTo(null);}}>
                        {!isOpen?
                        <AddCircleRoundedIcon style={iconButtonStyle} />
                        :
                        <CancelRoundedIcon style={iconButtonStyle} />
                        }
                    </IconButton>
                </Box>   
                <Grid container>    
                    <Grid item xs={1} />        
                    <Grid item xs={8}>     
                        <Box className="m-auto" style={slideUpStyle}>
                            <Card variant="outlined" style={{borderRadius:'15px', boxShadow: "3px 3px 3px 0px rgba(0, 0, 0, 0.45)",}}>
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