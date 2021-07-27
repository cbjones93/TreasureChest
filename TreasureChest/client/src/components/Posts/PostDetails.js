import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById } from "../../modules/postManager.js";
import { Link } from "react-router-dom";
import { deletePost } from "../../modules/postManager.js";


const PostDetail = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const history = useHistory();
    console.log(props.activeUser.id)
    
    const handleDeletePost = (id) => {
        window.confirm(`Are you sure you want to delete ${post.name}?`);
        deletePost(id)
        history.push("/posts")
    }
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
                <img src={post.imageLocation} alt={post.name} />
                <Link to={`../../users/${post.sellerId}`}><h5>By: {post.user?.firstName} {post.user?.lastName}</h5></Link>
                <p>{post.description}</p>
                <p>${post.price}</p>
                <p>Category: {post.category?.name}</p>
                {post.sellerId === props.activeUser.id &&
                    <>
                        <button className="buttonRemovePost" type="button" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                        <button onClick={() => history.push(`/posts/edit/${post.id}`)}> Edit</button>
                    </>
                }
            </CardBody>
        </Card>
    )
}
export default PostDetail