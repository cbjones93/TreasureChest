import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { getAllPosts } from "../../modules/postManager";
import Post from "../Posts/Post";
import Favorite from "../Favorite/Favorite";
import { getFavoritesByUserId } from "../../modules/favoriteManager";
import { addFollow, deleteFollow, getAllFollowsByUserId } from "../../modules/followManager";

const UserAccount = (props) => {
    const { id } = useParams();
    const [follows, setFollows] = useState([]);
    const [posts, setPosts] = useState([])
    const [favorites, setFavorites] = useState([]);
    const [isFollowed, setIsFollowed] = useState()
    const [userAccount, setUserAccount] = useState({});
    const history = useHistory();

    const handleDeleteFollow = (id) => {
        window.confirm(`Are you sure you want to remove ${userAccount.firstName} ${userAccount.lastName} From your favorite sellers?`);
        deleteFollow(id)

    }
    let loggedInUser = props.activeUser
    console.log(loggedInUser)
    let targetedUser = userAccount

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };
    const getFavorites = () => {
        getFavoritesByUserId(props.activeUser.id)
        .then(favorite => setFavorites(favorite))
    }
    const getUser = () => {
        getUserById(id)
            .then(account => setUserAccount(account));
    }
    const getFollows = () => {
        getAllFollowsByUserId(props.activeUser.id)
            .then(follow => setFollows(follow));

    };

    const handleAddFollow = () => {
        setIsFollowed(true)
        const newUserObject = {
            "userId": id,
        }
        addFollow(newUserObject)
    }
    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFavorites()
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFollows()
        }
    }, [loggedInUser]);

    useEffect(() => {
        getPosts();
    }, []);
    useEffect(() => {
        getUser();
    }, []);






    return (
        <>
            <Card>
                <CardBody>
                    <h5> {targetedUser.firstName} {targetedUser.lastName}'s Account Page</h5>
                    <img src={userAccount.imageLocation} />
                    <div>
                        <strong></strong>
                        <p>Email: {userAccount.email}</p>
                        <p>Address: {userAccount.address} </p>
                    </div>
                    {follows?.find(follow => follow.user.id != id && follow.user.id != loggedInUser.id) ?
                        <button onClick={handleAddFollow}> Follow this user!</button>
                        :
                        <>
                            <p>You're following this user!</p>
                            <h5>{userAccount.firstName}'s Items For Sale</h5>
                            {posts.map((post) => {
                                return (
                                    <>
                                        {post.user.id === userAccount.id && post.isPurchased !== true &&
                                            <Post post={post} key={post.id} />
                                        }
                                    </>
                                )

                            })
                            }
                             <h5>{userAccount.firstName}'s Saved Items</h5>
                {favorites.map((favorite) => {
                    return (
                        <>
                        <Favorite favorite = {favorite} key = {favorite.id} />
                        </>
                    )
                })}
                            {/* <button onClick={handleDeleteFollow}>  Unfollow User </button> */}
                        </>}


                </CardBody>
            </Card>
        </>
    )
}

export default UserAccount