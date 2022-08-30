import { useEffect, useState } from "react";
import firebase from "firebase";
import {updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { UseTimestampToDate } from "../hooks/useTimestampToDate";
import { PostedCard } from "../components/modules/PostedCard";

export const MyPage = () =>{
    const [me,setMe] = useState();
    const [email,setEmail] = useState();
    const [displayName,setDisplayName] = useState();
    const [posts,setPosts] = useState([]);

    const history = useNavigate();
    useEffect(()=>{
        const db = firebase.firestore();
        const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                setMe(user);
                setEmail(user.email);
                setDisplayName(user.displayName);
                //DBから自分の投稿取得
                const ref = db.collection(`posts`).where('email','==',user.email).orderBy('createdAt','desc');
                ref.onSnapshot((snapshot)=>{
                    const userPosts = [];
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
                },(error) => {
                    console.log(error);
                    alert('投稿の読み込みに失敗しました。\nネットワーク環境を確認してみてください。');
                });
            }else{
                history('../login');
            }
        });
        return unsubscribe;
      },[]);

      //ニックネーム変更
      const changeDisplayName = () =>{
        const unsubscribe = firebase.auth().onAuthStateChanged((userInfo)=>{
            if(userInfo){
                if(window.confirm('ニックネームを変更します。よろしいですか？\n※過去の投稿には反映されません。')){
                    const user = userInfo;
                    user.updateProfile({
                        displayName,
                    }).then(()=>{
                        alert('ニックネームを変更しました。');
                    }).catch((error)=>{
                        console.log(error);
                        alert('通信に失敗しました。\n接続環境を確認してみてください。');
                    })
                }
            }else{
                history('../login');
            }}
            )
      }

      return(
        <>
        <Grid container>
            <Grid item xs={8} sx={{margin:'auto'}}>
                <TableContainer className="mt-5">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    E-Mail
                                </TableCell>
                                <TableCell>
                                {email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    ニックネーム
                                </TableCell>
                                <TableCell>
                                    <TextField variant="outlined" label=' ' value={displayName} onChange={(val)=>setDisplayName(val.target.value)} size="small" /> 
                                    <Button className="ms-3" onClick={changeDisplayName}>変更する</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography className="mt-5 mb-3">
                    投稿一覧
                </Typography>
                <Box className="m-auto">
                    {posts.map((post)=>{
                       return  (
                        <PostedCard 
                        key={post.id}
                        id={post.id}
                        username={post.username} 
                        content={post.bodyText}  
                        time={post.createdAt}
                        isMyPost={post.email == me.email ?true:false}
                        />
                        )}
                    )}
                </Box>


            </Grid>
        </Grid>
        </>
      )
}