import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button } from "reactstrap";
import {  useParams } from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { getAllPosts } from "../../modules/postManager";
import Post from "../Posts/Post";
import Favorite from "../Favorite/Favorite";
import { getFavoritesByUserId } from "../../modules/favoriteManager";
import { addFollow, deleteFollow, getAllFollowsByUserId } from "../../modules/followManager";
import "./User.css"
import "../Posts/Post.css"

const UserAccount = (props) => {
    const { id } = useParams();
    const [follows, setFollows] = useState([]);
    const [posts, setPosts] = useState([])
    const [favorites, setFavorites] = useState([]);

    const [userAccount, setUserAccount] = useState({});
    const [activeUser, setActiveUser] = useState(false);
    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
      }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const handleDeleteFollow = (id) => {
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
        sleep(300)
            .then(() => {
                getAllFollowsByUserId(props.activeUser.id)
                    .then(follow => {
                        let filteredFollows = follow.find((follow => follow.user.id == id && follow.currentUserId === loggedInUser.id))
                        setFollows(filteredFollows);
                    })
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
        if (props.activeUser.id === undefined) {
            setActiveUser(!activeUser)
        }
    }, [userAccount, activeUser]);

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        getUser();
    }, []);






    return (
        <>
            <Container>
                <Card>
                    <CardBody>
                     
                            <h5 className="headerText"> {userAccount.firstName} {userAccount.lastName}'s Account Page</h5>
                            <img style={imgStyle} src={userAccount.imageLocation} />
                            <div>
                                <strong></strong>
                                <p>Email: {userAccount.email}</p>
                                <p>Address: {userAccount.address} </p>
                            </div>
                            {(follows === undefined || follows?.length === 0) && (loggedInUser.id !== userAccount.id) ?
                                <Button onClick={handleAddFollow}> Follow this user!</Button>
                                :
                                <></>
                            }
                            {follows !== undefined && follows?.length !== 0 ?
                                <Button onClick={() => handleDeleteFollow(follows.id)}>  Unfollow User </Button> :
                                <> </>}
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
 
                            <h5 className="headerText">{userAccount.firstName}'s Items For Sale</h5>
                            <div className="postList">
                            {posts.map((post) => {
                                return (
                                    <>
                                        {post.user.id === userAccount.id && post.isPurchased !== true &&
                                            <Post post={post} key={post.id} userAccount={userAccount} />
                                        }
                                    </>
                                )

                            })
                            }
                            </div>
                            <h5 className="headerText">{userAccount.firstName}'s Saved Items</h5>
                            <div className="postList">
                            {favorites.map((favorite) => {
                                return (
                                    <>
                                        <Favorite favorite={favorite} key={favorite.id} />
                                    </>
                                )
                            })}
                            </div>



                        
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default UserAccount