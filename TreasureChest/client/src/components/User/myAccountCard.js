import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { getAllPosts } from "../../modules/postManager";
import Post from "../Posts/Post";

const MyAccount = (props) => {
    const [myAccount, setMyAccount] = useState({});
    const [posts, setPosts] = useState([])
    const history = useHistory();

    let loggedInUser = props.activeUser
    console.log(loggedInUser)

    const getUser = () => {
        getUserById(loggedInUser.id)
            .then(account => setMyAccount(account))
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
    }, []);
    return (
        <Card>
            <CardBody>
                <h5>Your Account Details</h5>
             <img src={myAccount.imageLocation} />
                <p>
                    <strong>{myAccount.firstName} {myAccount.lastName}</strong>
                    <p>Email: {myAccount.email}</p>
                    <p>Address: {myAccount.address} </p>
                 </p> 
                 <h5>Your Purchased Items</h5>
                 {posts.map((post) => {
                     if(post.buyerId === myAccount.id) {
                         return (
                             <Post post = {post} key= {post.id} />
                         )
                     }
                     })
                 }
            </CardBody>
        </Card>
    )
}
export default MyAccount