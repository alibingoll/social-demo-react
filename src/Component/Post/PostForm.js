import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import "./Post.css";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostForm(props) {
  const { userName, userId, refreshPosts } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [isSend, setIsSend] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSend(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleLikedClick = () => {
    setLiked(!liked);
  };
  const handleSubmit = () => {
    savePost();
    setIsSend(true);
    refreshPosts();
    setTitle("");
    setText("");
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSend(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSend(false);
  };

  return (
    <div>
      <Snackbar open={isSend} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
         Post Başarılı
        </Alert>
      </Snackbar>
      <div className="postContainer">
        <Card sx={{ maxWidth: 500 }} className="card">
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                style={{
                  background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                  color: "white",
                }}
              >
                {/* {userName[0]} */}
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                {/* <MoreVertIcon /> */}
              </IconButton>
            }
            title={
              <OutlinedInput
                id="outline-adornment-amount"
                multiline
                fullWidth
                placeholder="Title"
                inputProps={{ maxLength: 25 }}
                value={title}
                onChange={(i) => handleTitle(i.target.value)}
              ></OutlinedInput>
            }
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {
                <OutlinedInput
                  id="outline-adornment-amount"
                  multiline
                  placeholder="Text"
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  value={text}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        style={{
                          background:
                            "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
                          color: "white",
                        }}
                        onClick={handleSubmit}
                      >
                        Post
                      </Button>
                    </InputAdornment>
                  }
                  onChange={(i) => handleText(i.target.value)}
                ></OutlinedInput>
              }
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
