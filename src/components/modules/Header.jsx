import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Link, ListItemIcon, MenuItem, MenuList } from '@mui/material';
import { LogoutButton } from './LogoutButton';
import { useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { MainMenu } from './MainMenu';


export const Header = () => {
  const [isLogin,setIsLogin] = useState(false);
  const [me,setMe] = useState();
  const [isMenuOpen,setIsMenuOpen] = useState(false);

  const history = useNavigate();

  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            setIsLogin(true);
            setMe(user.displayName);
        }
    });
    return unsubscribe;
  },[]);

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:"#fd7e14"}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </IconButton> */}
          {isLogin
          && 
          <>
          <IconButton onClick={()=>history('../mypage')}>
            <AccountCircleRoundedIcon sx={{color:'#fff'}} />
          </IconButton>
          <Typography onClick={()=>history('../mypage')} style={{cursor:'pointer',"&:hover":{textDecoration:'underline',}}}>{me}</Typography>
          </>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isLogin
            &&
            <IconButton onClick={()=>history('../threads')}>
              <HomeIcon />
            </IconButton>
            }
            {/* <Link href="../threads" sx={{textDecoration:"none",color:"#fff"}}>mysns</Link> */}
          </Typography>
          {!isLogin 
          ? <Button color="inherit" href='./login'>????????????</Button>
          : <LogoutButton />
          }
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={2}>
          <Box sx={isMenuOpen ? {display:'block'} : {display:'none'}}>
            {/* <MainMenu isLogin={isLogin} setIsLogin={setIsLogin}/> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
