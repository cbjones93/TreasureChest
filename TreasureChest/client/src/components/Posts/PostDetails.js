import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById } from "../../modules/postManager.js";
import { Link } from "react-router-dom";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const history = useHistory();

    const getPostDetails = () => {
        getPostById(id)
        .then(setPost)
    }

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <Card>
            <CardBody>
                <p>
                    <strong>{post.name}</strong>
                </p>
                <img src={post.imageLocation} alt={post.name}/>
                <p>{post.description}</p>
                <p>${post.price}</p>
                <p>Category: {post.category?.name}</p>

            </CardBody>
        </Card>
    )
}
export default PostDetail