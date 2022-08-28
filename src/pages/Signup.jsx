import { Box } from "@mui/material";
import { SignupCard } from "../components/modules/SignupCard";

export const Signup = () =>{
    const labels = {title:'サインアップ',link:'ログインはこちら'};
    const path = './login';
    return(
        <>
            <Box className="text-center" style={{marginTop:'100px'}}>
                <p>利用にはユーザー登録が必要です。</p>
                <SignupCard labels={labels} path={path} />
            </Box>
        </>
    )
}