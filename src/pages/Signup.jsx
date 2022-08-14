import { Box } from "@mui/material";
import { InputCard } from "../components/modules/InputCard"

export const Signup = () =>{
    const labels = {title:'サインアップ',link:'ログインはこちら'};
    const path = './login';
    return(
        <>
            <Box className="text-center" style={{marginTop:'100px'}}>
                <p>利用にはユーザー登録が必要です。</p>
                <InputCard labels={labels} path={path} />
            </Box>
        </>
    )
}