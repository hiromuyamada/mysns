import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { MenuList } from "../components/modules/MenuList";
import { PostedCard } from "../components/modules/PostedCard";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";
import firebase from "firebase";

export const Threads = () =>{

    const [isOpen,setIsOpen] = useState(false);

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

    const [bodyText,setBodyText] = useState('');
    const handleClick = () => {
        const {currentUser} = firebase.auth();
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/posts`);
        ref.add({
            bodyText,
            createdAt:new Date(),  
        }).then((docRef) =>{
            console.log('created!',docRef.id);
        }).catch((error)=>console.log("Error",error));
    }

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
                    <PostedCard username='ﾁｬﾝ' content='きょうはディズニーランドにいきました。'  time='1970/01/11'/>
                    <PostedCard username='こめ' content='きのうは花火をみににいきまちた。' time='1990/01/11' />
                    <PostedCard username='あーちゃん' content='きょうはおねむの日でした。' time='2110/01/14' />
                    <PostedCard username='あーちゃん' content='北海道旅行のおししめ教えて下さい' time='2022/08/13' />
                    <PostedCard username='ばちまる' content='おたる' time='2022/08/13' />
                    <PostedCard username='ひらむ' content='はこだて' time='2022/08/13' />
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
                                    <TextField value={bodyText} onChange={(val)=>setBodyText(val.target.value)} fullWidth label="投稿" multiline rows={6}/>
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