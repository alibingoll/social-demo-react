import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import "./Post.css";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Comment from "../Comment/Comment";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Container from "@mui/material/Container";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {
    const {title, text, userName, userId, postId, likes} = props;
    const [expanded, setExpanded] = React.useState(false);
    const isInitialMount = useRef(true)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [likeId, setLikeId] = useState(0);


    const saveLike = () => {
        fetch("likes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId:postId,
                userId:userId
            })
        })
            .catch((err)=> console.log(err))
    }

    const deleteLike = () => {
        fetch("likes/"+likeId,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId:postId,
                userId:userId
            })
        })
            .then((res)=>res.json())
            .catch((err)=> console.log(err))
    }
    const handleLikedClick = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            setLikeCount(likeCount + 1)
            saveLike();
        } else {
            setLikeCount(likeCount - 1)
            deleteLike();
        }
    };
      const checkLikes = () => {
        var likeControl = likes?.find((like => like.userId === userId))
        if (likeControl != null) {
            setIsLiked(true);
            setLikeId(likeControl.id);
            console.log("likeControl :"+likeControl.id)
            setLikeCount(likes?.length ? likes.length : 0)
        }

    }



    const refreshComments = () => {
        fetch(`/comments?postId=${postId}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(postId);
                    console.log(result);
                    setIsLoaded(true);
                    setCommentsList(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        if (isInitialMount.current) {
            refreshComments();
            isInitialMount.current = false
        }
    }, [commentsList]);

    useEffect(() => {
        checkLikes()
    }, [])
    const handleExpandClick = () => {
        if (!expanded) refreshComments();
        setExpanded(!expanded);
    };

    return (
        <div className="postContainer">

            <Card sx={{maxWidth: 500}} className="card">
                <CardHeader
                    avatar={
                        <Link to={{pathname: "/users/" + userId}} className="link">
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe"
                                    style={{
                                        background: 'linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)',
                                        color: "white"
                                    }}
                            >
                                {/* {userName[0]} */}
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            {/* <MoreVertIcon /> */}
                        </IconButton>
                    }
                    title={title}
                    subheader={userName}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"
                                onClick={handleLikedClick}>
                        <FavoriteIcon style={isLiked ? {color: "red"} : null}/>
                    </IconButton>
                    {likeCount}
                    {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {commentsList.map((comment) => (
                            <Comment key={comment.id}
                                     text={comment.text}
                                     userName={comment.userName}
                                     userId={comment.user_id}
                            ></Comment>
                        ))}
                        <CommentForm
                            userName={userName}
                            userId={userId}
                            postId={postId}
                            refreshComments={refreshComments}
                        ></CommentForm>
                    </Container>
                </Collapse>
            </Card>


        </div>
    );
}
