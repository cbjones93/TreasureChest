import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Posts/PostList";
import PostForm from "./Posts/PostForm";
import PostDetail  from "./Posts/PostDetails";
import PostEdit from "./Posts/PostEditForm";
import {getCurrentUser} from "../modules/authManager";

export default function ApplicationViews({ isLoggedIn }) {
const [activeUser, setActiveUser] = useState({});


useEffect (() =>{
  if(isLoggedIn) {
   getCurrentUser()
   .then((user)  => {
    setActiveUser(user)
    console.log(user)
  })
  }
}, [])

  return (
    <main>
      <Switch>
        {/* <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route> */}
        <Route path="/" exact>
          <div> Hello! </div>
        </Route>

        <Route path="/posts" exact>
          <PostList />
        </Route>

        <Route path="/createpost">
          <PostForm />
        </Route>

        <Route path="/posts/details/:id" exact>
        <PostDetail activeUser = {activeUser} />
      </Route>
      <Route path="/posts/edit/:id" exact>
        <PostEdit activeUser = {activeUser} />
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
