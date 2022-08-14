import {Box, Card, CardContent,Typography } from "@mui/material";

export const PostedCard = (props) =>{
    const {username,content,time} = props;
    return(
        <Card variant="outlined" className="border-2 mb-4">
            <CardContent sx={{textAlign:"left"}}>
                <Typography variant="h5">
                    {username}
                </Typography>

                <Typography className="mt-5">
                    {content}
                 </Typography>

                 <Typography variant="p">
                    posted at:{time}
                 </Typography>
            </CardContent>
        </Card>
);
}