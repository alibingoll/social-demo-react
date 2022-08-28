import React, {useState, useEffect, useRef} from "react";
import Post from "../Post/Post.js";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm.js";


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const isInitialMount = useRef(true)

  const refreshPosts = () => {
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
  }

  useEffect(() => {
    if(isInitialMount.current)
    {
      refreshPosts();
      isInitialMount.current=false
    }
  }, [postList]);
  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
      <React.Fragment>
        <PostForm
          userName={"ddd"}
          userId={4} 
          refreshPosts={refreshPosts}
          ></PostForm >
        {postList.map((post) => (
          <Post key={post.id} title={post.title} text={post.text} 
          userName={post.userName}
          userId={post.userId}
          postId={post.id}
          ></Post>
        ))}
    </React.Fragment>
    );
  }
}

export default Home;
