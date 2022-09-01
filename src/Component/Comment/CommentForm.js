import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Button, InputAdornment, OutlinedInput} from "@mui/material";
import "../Post/Post.css";


const CommentForm = (props) => {
    const saveComment = () => {
        fetch("/comments",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId:postId,
                userId:userId,
                text:text
            })
        })
            .then((res) =>{res.json()})
            .catch((err)=>{
                console.log(err)})
    }

    const handleSubmit = () => {
        saveComment();
        setText("")
        refreshComments();
    }

    const handleChange = (value) => {
        setText(value);
    }


    const {userId, userName, postId,refreshComments} = props
    const [text,setText] = useState("");

    return (
        <div>
            <Card>
                <CardContent>
                    <OutlinedInput
                        id={"outlined-adornment-amount"}
                        multiline
                        inputProps={{maxLength: 250}}
                        fullWidth
                        onChange={(i) =>handleChange(i.target.value)}
                        startAdornment = {
                            <InputAdornment position={"start"}>
                                <Link to={{pathname :"/users/"+userId}} >
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                                            style={{background:'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',color:"white"}}
                                    >
                                        {/* {userName[0]} */}
                                        {userName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Link>
                            </InputAdornment>
                        }
                        endAdornment={
                           <InputAdornment position={"end"}>
                               <Button
                                   variant="contained"
                                   style={{
                                       background:
                                           "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                                       color: "white",
                                   }}
                                   onClick={handleSubmit}
                               >
                                   Comment
                               </Button>
                           </InputAdornment>
                        }
                    >

                    </OutlinedInput>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    {text}*/}
                    {/*</Typography>*/}
                </CardContent>
            </Card>
        </div>
    );
};

export default CommentForm;
