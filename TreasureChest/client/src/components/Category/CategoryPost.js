import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
const imgStyle = {
    maxHeight: 128,
    maxWidth: 128
  }
const CategoryPost = ({ post, loggedInUser }) => {

   
    if (post.isPurchased === false) {
        return (
            <Card >
                < CardBody >

                    <p>
                        <strong>{post.name}</strong>
                    </p>
                    
                    <p>${post.price}</p>
                    <div>{post.user?.id !== loggedInUser?.id ?
                        <button>
                            <Link to={`/posts/details/${post.id}`}><img style={imgStyle} src={post.imageLocation} alt={post.name} /></Link>
                        </button>
                         :
                        <p>This is your post! Click to view the details!</p>}
                    </div>





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
export default CategoryPost;