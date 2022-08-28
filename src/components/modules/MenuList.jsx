import {List, ListItem, ListItemText} from "@mui/material";

export const MenuList = (props) =>{
    const {text,handleClick, currentCategory} = props;

    return(
            <ListItem onClick={()=>handleClick(text)} button>
                {text == currentCategory 
                ? <ListItemText primary={text} primaryTypographyProps={{fontWeight:'bold'}} />
                : <ListItemText primary={text} />
                }
            </ListItem>
    );
}