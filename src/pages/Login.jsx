import { Box, Button,Card,CardContent,CardHeader,TextField } from "@mui/material";
import { LoginCard } from "../components/modules/LoginCard";

export const Login = () =>{
const labels = {title:'ログイン',link:'新規登録はこちら'};
const path = './signup';
    return(
        <>
        <Box className="text-center" style={{marginTop:'100px'}}>
            <p>ユーザー名とパスワードを入力してログインしてください。</p>
            <LoginCard labels={labels} path={path} />
        </Box>
        <Box>
        </Box>
        </>
    );
}