import React, { useState, useEffect } from "react";
import Post from "../Post/Post.js";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
      <React.Fragment>
        {postList.map((post) => (
          <Post key={post.id} title={post.title} text={post.text} 
          userName={post.userName}
          userId={post.userId}
          ></Post>
        ))}
    </React.Fragment>
    );
  }
}

export default Home;
