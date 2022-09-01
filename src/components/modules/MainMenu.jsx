import { ListItemIcon, MenuItem, MenuList, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import firebase from "firebase";
import { useState } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const MainMenu = (props) =>{
    const {isLogin,setIsLogin} = props;
    const history = useNavigate();

    const signOut = ()=> {
        firebase.auth().signOut()
        .then(()=>{
            setIsLogin(false);
            history('../login');
        })
        .catch((error)=>{
            alert('ログアウトに失敗しました。');
        });
    };


    return(
    <MenuList sx={{position:'fixed'}}>
    <MenuItem onClick={()=>history('./threads')}>
      <ListItemIcon>
      </ListItemIcon>
      <HomeIcon />
      <Typography className="p-2" variant="inherit">ホーム</Typography>
    </MenuItem>
    <MenuItem onClick={()=>history('./mypage')}>
      <ListItemIcon>
      </ListItemIcon>
      <AccountCircleRoundedIcon sx={{color:'#555'}} />
      <Typography variant="inherit">マイページ</Typography>
    </MenuItem>
    <MenuItem onClick={()=>{
        isLogin 
        ? signOut()
        : history('/login')
    }}>
      <ListItemIcon>
      </ListItemIcon>
      <Typography variant="inherit" noWrap>
        {isLogin 
        ? <LoginIcon /> 
        :<LogoutIcon />
        }
      
        {isLogin 
        ? 'ログアウト'
        : 'ログイン'
        }
      </Typography>
    </MenuItem>
  </MenuList>
    )

}