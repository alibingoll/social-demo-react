import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import "../Post/Post.css";


const Comment = (props) => {
    const {userId, userName, text} = props
    return (
        <div>
            <Card>
            <CardContent>
                <OutlinedInput
                    disabled
                    id={"outlined-adornment-amount"}
                    multiline
                    inputProps={{maxLength: 25}}
                    fullWidth
                    value={text}
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

export default Comment;