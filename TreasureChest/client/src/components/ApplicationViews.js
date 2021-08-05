import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Posts/PostList";
import PostForm from "./Posts/PostForm";
import PostDetail from "./Posts/PostDetails";
import PostEdit from "./Posts/PostEditForm";
import { getCurrentUser } from "../modules/authManager";
import FollowList from "./Follow/FollowList";
import MyAccount from "./User/myAccountCard";
import UserAccount from "./User/userAccountCard"
import { UserEdit } from "./User/myAccountEditForm";
import CategoryPostList from "./Category/CategoryPostList";
import Home from "./Home";

export default function ApplicationViews({ isLoggedIn }) {
  const [activeUser, setActiveUser] = useState({});
 

  const UserLoggedIn = () => {
    if (isLoggedIn) {
      getCurrentUser()
        .then((user) => {
          setActiveUser(user)
         
         
        }
        )}
    }

    useEffect(() => {
      UserLoggedIn();
    }, [setActiveUser, isLoggedIn]);

    return (
      <main>
        <Switch>
          {/* <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route> */}
          <Route path="/" exact>
           <Home activeUser={activeUser} />
          </Route>

          <Route path="/posts" exact>
            {isLoggedIn ? <PostList activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/createpost">
            {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/myaccount" exact>
            {isLoggedIn ? <MyAccount activeUser={activeUser} /> : <Redirect to="/login" />}
            
          </Route>

          <Route path="/myaccount/edit">
            {isLoggedIn ? <UserEdit activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/posts/details/:id" exact>
            {isLoggedIn ? <PostDetail activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/posts/edit/:id" exact>
            {isLoggedIn ? <PostEdit activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/categoryPost/:id" exact>
            {isLoggedIn ? <CategoryPostList activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>


          <Route path="/users/:id" exact>
            {isLoggedIn ? <UserAccount activeUser={activeUser} /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>


          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </main >
    );
  };
