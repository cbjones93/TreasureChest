import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById } from "../../modules/postManager.js";
import { Link } from "react-router-dom";
import { deletePost, buyItem } from "../../modules/postManager.js";
import { addFavorite, getFavoritesByUserId, deleteFavorite } from "../../modules/favoriteManager.js";


const PostDetail = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [favorites, setFavorites] = useState([]);

    const history = useHistory();

    let loggedInUser = props.activeUser
    console.log(loggedInUser)

    const getFavorites = () => {
        getFavoritesByUserId(loggedInUser.id)
            .then(favorite => {
                let filteredFavorites = favorite.find(f => f.userId === loggedInUser.id && f.post.id === post.id)
                setFavorites(filteredFavorites)
            })

    }
    const handleDeleteFavorite = (id) => {
        deleteFavorite(id)
            .then(getFavorites());
    }
    const handleDeletePost = (id) => {

        if (window.confirm(`Are you sure you want to delete ${post.name}?`)) {
            deletePost(id)
        }
        else {
            //Do nothing!
        }
        history.push("/posts")
    }

    const handleBuyPost = () => {
        window.confirm(`Are you sure you want to buy ${post.name}?`);
        buyItem(post)
            .then(getPostDetails())

    }

    const handleFavoritePost = () => {
        const newFavoriteObject = {
            ItemId: id
        }
        addFavorite(newFavoriteObject)
            .then(getFavorites())
    }
    const getPostDetails = () => {
        getPostById(id)
            .then(setPost)
    }


    useEffect(() => {
        getPostDetails();
    }, [favorites]);

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFavorites()
        }
    }, [loggedInUser]);


    console.log(favorites)
    console.log(post)

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
                    <>
                        <button className="buttonBuyPost" type="button" onClick={() => handleBuyPost(post.id)}>Buy {post.name}</button>
                    </>
                }
                {post.isPurchased === false && post.sellerId !== props.activeUser.id ?
                    favorites === undefined
                        ?
                        <button className="buttonFavoritePost" type="button" onClick={() => handleFavoritePost(post.id)}>Save {post.name}</button>
                        :
                        <button className="buttonRemoveFavorite" type="button" onClick={() => handleDeleteFavorite(favorites.id)}>Remove {post.name} From Favorites</button>
                    :
                    null
                }

                {post.buyerId === props.activeUser.id &&
                    <div>You have purchased this item!</div>}
            </CardBody>
        </Card>
    )
}
export default PostDetail