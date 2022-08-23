import "./Post.css"
function Post(props) {
    const {title,text} = props;
    return(
        <div className="postContainer">
            <b>{title}</b> - 
            {text}
        </div>
    )
}
export default Post;