import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Post = ({ post }) => {
  const history = useHistory()

  if (post.isPurchased === false) {
    return (
        <Card >
            < CardBody >
            
                <p>
                    <strong>{post.name}</strong>
                </p>
                <img src={post.imageLocation} alt={post.name}/>
                <p>${post.price}</p>
                <button>
                    <Link to={`/posts/details/${post.id}`}>view details</Link>
                </button>
               
            </CardBody >
        </Card >
    );
  }
  else {
      return (
          <></>
      )
  }
};
export default Post;

