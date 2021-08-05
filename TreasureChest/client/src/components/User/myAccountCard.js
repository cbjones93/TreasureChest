import React, { useEffect, useState } from "react";
import { Card, CardBody, Container } from "reactstrap";
import { Link} from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { getAllPosts } from "../../modules/postManager";
import Post from "../Posts/Post";
import { getFavoritesByUserId } from "../../modules/favoriteManager";
import Favorite from "../Favorite/Favorite";
import "./User.css"
import "../Posts/Post.css"
import FollowList from "../Follow/FollowList";
import Follow from "../Follow/Follow";
import { getAllFollows } from "../../modules/followManager";

const MyAccount = (props) => {
    const [myAccount, setMyAccount] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [posts, setPosts] = useState([])
    const [follows, setFollows] = useState([]);

    const getFollows = () => {
        getAllFollows()
        .then(follow => setFollows(follow));
    };

    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
      }
    let loggedInUser = props.activeUser
   
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
        getFollows()
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
       <Container className="mt-3">
        <Card>
            <CardBody>
              
                <h5>Your Account Details</h5>
                <img style ={imgStyle} src={myAccount.imageLocation} />
                <div>
                    <strong>{myAccount.firstName} {myAccount.lastName}</strong>
                    <p>Email: {myAccount.email}</p>
                    <p>Address: {myAccount.address} </p>
                    <button>
                        <Link to={`/myaccount/edit`}>Edit Account</Link>
                    </button>
                </div>
                </CardBody>
                </Card>
                <Card>
                    <CardBody>
                <h5 className="headerText">Items For Sale</h5>
                <div className="postList">
                {posts.map((post) => {
                    return (
                        <>
                            {post.user.id === loggedInUser.id && post.isPurchased !== true &&
                                <Post post={post} key={post.id} myAccount = {myAccount} />
                            }
                        </>
                    )

                })
                }
                </div>
                <h5 className="headerText">Your Purchased Items</h5>
                <div className="postList">
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
                </div>
                <h5 className="headerText">Your Saved Items</h5>
                <div className="postList">
                {favorites.map((favorite) => {
                    return (
                        <>
                        <Favorite favorite = {favorite} key = {favorite.id} />
                        </>
                    )
                })}
                </div>
              
            
                <h5 className="headerText"> Your Favorite Sellers</h5>
                <div className="postList">
            {follows.map((follow => {
                return (
                    <Follow follow={follow}
                        key={follow.id}
                        loggedInUser={loggedInUser}
                    />
                )
            }))}
            </div>
           
      
            </CardBody>
        </Card>
        </Container>
       
    )
}
export default MyAccount