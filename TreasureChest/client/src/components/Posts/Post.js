import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Post = ({ post, loggedInUser, userAccount }) => {
  
    const history = useHistory()
    return (
        <Card >
            < CardBody >

                <div>
                    <strong>{post.name}</strong>
                </div>
               
                <p>${post.price}
                {post.user?.id !== loggedInUser?.id && userAccount === undefined &&<Link to={`../../users/${post.user.id}`}><p> By: {post.user?.firstName} {post.user?.lastName}</p></Link> }</p>
                <button>
                    <Link to={`/posts/details/${post.id}`}> <img src={post.imageLocation} alt={post.name} /></Link>
                </button>
                {post.user?.id === loggedInUser?.id && <div>This is your post! Click details to edit!</div>}

            </CardBody >
        </Card >
    );

};
export default Post;

