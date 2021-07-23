import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  
    return (
        <Card >
            < CardBody >
            
                <p>
                    <strong>{post.name}</strong> by {post.user.firstName} {post.user.lastName}
                </p>
                <img src={post.imageLocation} alt={post.name}/>
                <p>{post.description}</p>
                <p>${post.price}</p>
                <p>Category: {post.category.name}</p>
                <button>
                    <Link to={`/posts/details/${post.id}`}>view details</Link>
                </button>
            </CardBody >
        </Card >
    );
};
export default Post;

