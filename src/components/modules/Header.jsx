import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { LogoutButton } from './LogoutButton';
import { useEffect, useState } from 'react';
import firebase from 'firebase';


export const Header = () => {
  const [isLogin,setIsLogin] = useState(false);

  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            setIsLogin(true);
        }
    });
    return unsubscribe;
  },[]);

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:"#fd7e14"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            mysns
          </Typography>
          {!isLogin 
          ? <Button color="inherit" href='../../Login'>ログイン</Button>
          : <LogoutButton />
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
