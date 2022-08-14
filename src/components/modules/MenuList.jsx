import {List, ListItem, ListItemText} from "@mui/material";

export const MenuList = (props) =>{
    const text = props.text;

    return(
            <ListItem button>
                <ListItemText primary={text} />
            </ListItem>
    );
}