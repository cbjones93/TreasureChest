import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { getAllPosts } from "../../modules/postManager";
import Post from "../Posts/Post";
import { getFavoritesByUserId } from "../../modules/favoriteManager";
import Favorite from "../Favorite/Favorite";

const MyAccount = (props) => {
    const [myAccount, setMyAccount] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [posts, setPosts] = useState([])
    const history = useHistory();

    let loggedInUser = props.activeUser
    console.log(props.activeUser)

    const getUser = () => {
        getUserById(loggedInUser.id)
            .then(account => setMyAccount(account))
    }
    const getFavorites = () => {
        getFavoritesByUserId(loggedInUser.id)
        .then(favorite => setFavorites(favorite))
    }
    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);
    
  

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getUser() 
        }
    }, [props.activeUser.id]);

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFavorites()
        }
    }, [loggedInUser]);


    return (
        <Card>
            <CardBody>
                <h5>Your Account Details</h5>
                <img src={myAccount.imageLocation} />
                <div>
                    <strong>{myAccount.firstName} {myAccount.lastName}</strong>
                    <p>Email: {myAccount.email}</p>
                    <p>Address: {myAccount.address} </p>
                    <button>
                        <Link to={`/myaccount/edit`}>Edit Account</Link>
                    </button>
                </div>
                <h5>Items For Sale</h5>
                {posts.map((post) => {
                    return (
                        <>
                            {post.user.id === loggedInUser.id && post.isPurchased !== true &&
                                <Post post={post} key={post.id} />
                            }
                        </>
                    )

                })
                }
                <h5>Your Purchased Items</h5>
                {posts.map((post) => {
                    return (
                        <>
                            {post.buyerId === loggedInUser.id &&
                                <Post post={post} key={post.id} loggedInUser={loggedInUser} />
                            }
                        </>
                    )

                })
                }
                <h5>Your Saved Items</h5>
                {favorites.map((favorite) => {
                    return (
                        <>
                        <Favorite favorite = {favorite} key = {favorite.id} />
                        </>
                    )
                })}
            </CardBody>
        </Card>
    )
}
export default MyAccount