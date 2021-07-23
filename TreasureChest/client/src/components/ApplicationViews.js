import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Posts/PostList";


export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        {/* <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route> */}
        <Route path="/" exact>
          <div> Hello! </div>
        </Route>

        <Route path="/posts">
          <PostList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        </Switch>
    </main>
      );
};
