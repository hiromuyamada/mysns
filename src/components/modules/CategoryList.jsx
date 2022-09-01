import { Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { MenuList } from "./MenuList";


export const CategoryList = (props) =>{
    const setCurrentCategory = props.setCurrentCategory;
    const currentCategory = props.currentCategory;
    const [categories,setCategories] = useState([]);

    const handleClick = (cateName) =>{
        setCurrentCategory(cateName);
    }
    //DBからカテゴリ取得
    useEffect(()=>{
        const db = firebase.firestore();
        const {currentUser} = firebase.auth();
        let unsubscribe = () =>{};
        // if(currentUser){
            const ref = db.collection(`categories`).orderBy('createdAt','asc');
            unsubscribe = ref.onSnapshot((snapshot)=>{
                const allCategories = [];
                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    allCategories.push({
                        id:doc.id,
                        categoryName:data.categoryName,
                    });
                });
                setCategories(allCategories);
            },(error) => {
                console.log(error);
                alert('データの読み込みに失敗しました。');
            });
        // }
        // else{
        // }
        return unsubscribe;
    },[]);



return (
    <Card variant="outlined" className="ms-2" sx={{boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.2)",}}>
        <CardContent>                
    <List>
        <ListItem sx={{borderBottom:'1px solid #fd7e14'}}>
            <ListItemText primary='カテゴリ一覧' />
        </ListItem>
        {categories.map((cate)=>{
            return (
            <MenuList 
            key={cate.id}
            text={cate.categoryName}
            handleClick = {handleClick}
            currentCategory ={currentCategory}
             />)
        })}
    </List>
        </CardContent>
    </Card>
)

}