import React, { useEffect, useState } from "react";
import { getAllPosts, searchPosts } from "../../modules/postManager.js";
import Post from "./Post"
import { useHistory } from "react-router";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  } from 'reactstrap';
  import CategoryList from '../Category/CategoryList'



const PostList = (props) => {
    const [myAccount, setMyAccount] = useState({});
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const [search, setSearch] = useState([])

    let loggedInUser = props.activeUser
    console.log(loggedInUser) 

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };
    const handleInputChange = (event) => {
        const newSearch = {...search}
        let selectedVal = event.target.value
        newSearch[event.target.id] = selectedVal
        setSearch(newSearch)
    }
    const searchPost = (event) => {
        event.preventDefault()
        searchPosts(search.searchparam,true)
        .then(post => {
          setPosts(post)
        })
      }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {/* <button className="btn btn-primary" onClick={() => history.push("/posts/add")}>Create Post</button> */}
            <UncontrolledDropdown>
              <DropdownToggle>Categories</DropdownToggle>
              <DropdownMenu>
                <CategoryList />
              </DropdownMenu>
              </UncontrolledDropdown>
            <div>
            <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search Posts</span>
        </label>
        <input
            type="text"
            id="searchparam"
            placeholder="Search Posts"
            name="s"
            onChange={handleInputChange}
        />
        <button type="submit" onClick={searchPost}>Search</button>
    </form>
                <button onClick={() => history.push(`/createpost`)}> Create Post</button>
                {posts.map((post) => {

                    return (
                        <>
                        {post.isPurchased === false &&
                        <Post post={post} key={post.id} loggedInUser={loggedInUser} />}
                        </>
                        )
                        
                })}

            </div>
        </>
    );
}

export default PostList;