import { Box, Button,Card,CardContent,CardHeader,TextField } from "@mui/material";

export const InputCard = (props) =>{ 
    const {title,link} = props.labels;
    const path = props.path;

    return(
            <Card variant="outlined" style={{width:'300px',margin:'auto',padding:'10px'}}>
            <CardHeader title={title} />
            <CardContent>
                <TextField fullWidth label="Username" />
                <TextField className="mt-2" fullWidth label="Password" />
                <Button className="mt-3" variant='outlined' href="../../Threads">送信</Button>
                <p className="mt-3"><a href={path}>{link}</a></p>
            </CardContent>
            </Card>
    );
}
