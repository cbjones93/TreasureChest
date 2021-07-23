import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById } from "../../modules/postManager.js";
import { Link } from "react-router-dom";

export const PostDetail = () => {
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
                <p>Hello!</p>
                <p>
                    <strong>{post.name}</strong>
                </p>
            </CardBody>
        </Card>
    )
}