import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Post = ({ post, loggedInUser }) => {
    console.log(loggedInUser)
    const history = useHistory()
    return (
        <Card >
            < CardBody >

                <p>
                    <strong>{post.name}</strong>
                </p>
                <img src={post.imageLocation} alt={post.name} />
                <p>${post.price}
                {post.user?.id !== loggedInUser?.id &&<Link to={`../../users/${post.user.id}`}><p> By: {post.user?.firstName} {post.user?.lastName}</p></Link> }</p>
                {post.user?.id === loggedInUser?.id && <div>This is your post! Click details to edit!</div>}
                <button>
                    <Link to={`/posts/details/${post.id}`}>View Details</Link>
                </button>

            </CardBody >
        </Card >
    );

};
export default Post;

