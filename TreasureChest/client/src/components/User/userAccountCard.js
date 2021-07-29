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
    const [isFollowed, setIsFollowed] = useState(false)
    const [userAccount, setUserAccount] = useState({});
    const history = useHistory();

    const handleDeleteFollow = (id) => {
        debugger
        if (window.confirm(`Are you sure you want to remove ${userAccount.firstName} ${userAccount.lastName} From your favorite sellers?`)) {
            deleteFollow(id)
            .then(getFollows())
        }
        else {
        }
    }
    const handleAddFollow = () => {  
        const newUserObject = {
            "userId": id,
        }
        addFollow(newUserObject)
        .then(getFollows())
        
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
            .then(follow => {
                let filteredFollows = follow.find((follow => follow.user.id !== id && follow.user.id !== loggedInUser.id))
                setFollows(filteredFollows);
            })

    };

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFavorites()
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (props.activeUser.id !== undefined) {
            getFollows()
        }
    }, [props.activeUser.id]);

    useEffect(() => {
        getPosts();
    }, []);
    useEffect(() => {
        getUser();
    }, []);


console.log(follows)



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
                    {follows === undefined ?
                        <button onClick={handleAddFollow}> Follow this user!</button>
                        :
                     <></>
                    }
                    {follows !== undefined ?
                    <button onClick={() => handleDeleteFollow(follows.id)}>  Unfollow User </button> :
                    <> </> }
                    <h5>{userAccount.firstName}'s Items For Sale</h5>
                    {posts.map((post) => {
                        return (
                            <>
                                {post.user.id === userAccount.id && post.isPurchased !== true &&
                                    <Post post={post} key={post.id} userAccount = {userAccount} />
                                }
                            </>
                        )

                    })
                    }
                    <h5>{userAccount.firstName}'s Saved Items</h5>
                    {favorites.map((favorite) => {
                        return (
                            <>
                                <Favorite favorite={favorite} key={favorite.id} />
                            </>
                        )
                    })}
                
                        


                </CardBody>
        </Card>
        </>
    )
}

export default UserAccount