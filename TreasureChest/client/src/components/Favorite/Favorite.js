import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Favorite = ({ favorite }) => {
    const history = useHistory()
    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{favorite.post.name}</strong>
                </p>
                <Link to={`/posts/details/${favorite.post.id}`}>
             <img src={favorite.post.imageLocation} alt={favorite.post.name} />
             </Link>
            </CardBody >
        </Card >
    )
}
export default Favorite