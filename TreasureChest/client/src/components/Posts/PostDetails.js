import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById } from "../../modules/postManager.js";
import { Link } from "react-router-dom";
import { deletePost, buyItem } from "../../modules/postManager.js";


const PostDetail = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const history = useHistory();
   
    
    const handleDeletePost = (id) => {
        window.confirm(`Are you sure you want to delete ${post.name}?`);
        deletePost(id)
        history.push("/posts")
    }

    const handleBuyPost = () => {
        window.confirm(`Are you sure you want to buy ${post.name}?`);
        buyItem(post)
        
    }
    const getPostDetails = () => {
        getPostById(id)
            .then(setPost)
    }

    useEffect(() => {
        getPostDetails();
    }, [post]);

    
    return (
        <Card>
            <CardBody>
                <p>
                    <strong>{post.name}</strong>
                </p>
                <img src={post.imageLocation} alt={post.name} />
                {post.user?.id !== props.activeUser.id &&
                <Link to={`../../users/${post.sellerId}`}><h5>By: {post.user?.firstName} {post.user?.lastName}</h5></Link>}
                <p>{post.description}</p>
                <p>${post.price}</p>
                <p>Category: {post.category?.name}</p>
                {post.sellerId === props.activeUser.id &&
                    <>
                        <button className="buttonRemovePost" type="button" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                        <button onClick={() => history.push(`/posts/edit/${post.id}`)}> Edit</button>
                    </>
                }
                {post.sellerId !== props.activeUser.id && post.isPurchased !== true &&
                 <button className="buttonBuyPost" type="button" onClick={() => handleBuyPost(post.id)}>Buy {post.name}</button>
                }
                {post.buyerId === props.activeUser.id &&
                <div>You have purchased this item!</div>}
            </CardBody>
        </Card>
    )
}
export default PostDetail