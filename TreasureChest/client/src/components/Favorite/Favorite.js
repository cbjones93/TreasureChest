import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Favorite = ({ favorite }) => {
  
    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
      }
    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{favorite.post.name}</strong>
                </p>
                <Link to={`/posts/details/${favorite.post.id}`}>
             <img style={imgStyle} src={favorite.post.imageLocation} alt={favorite.post.name} />
             </Link>
             <p>${favorite.post?.price}</p>
            </CardBody >
        </Card >
    )
}
export default Favorite