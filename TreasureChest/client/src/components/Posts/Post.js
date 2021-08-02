import React from "react";
import { Card, CardBody, Media } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./Post.css"


const Post = ({ post, loggedInUser, userAccount }) => {
    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
      }
    const history = useHistory()
    return (
        <Card className = "post" style={{ width: '18rem' }}>
            < CardBody >

                <div>
                    <strong>{post.name}</strong>
                </div>
               
                <p>${post.price} </p>
                <button>
                    <Link to={`/posts/details/${post.id}`}> <img style = {imgStyle} src={post.imageLocation} alt={post.name} /></Link>
                </button>
                {post.user?.id !== loggedInUser?.id && userAccount === undefined &&<Link to={`../../users/${post.user.id}`}>
                    <p> By: {post.user?.firstName} {post.user?.lastName}</p></Link> }
                {post.user?.id === loggedInUser?.id && <div>This is your post! Click details to edit!</div>}

            </CardBody >
        </Card >
    );

};
export default Post;

