import React, { useEffect, useState } from "react";
import { getAllPosts, searchPosts } from "../../modules/postManager.js";
import Post from "./Post"
import { useHistory } from "react-router";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Form,
    Button,
    Input,
} from 'reactstrap';
import CategoryList from '../Category/CategoryList'
import "./Post.css"




const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const [search, setSearch] = useState([])

    let loggedInUser = props.activeUser


    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };
    const handleInputChange = (event) => {
        const newSearch = { ...search }
        let selectedVal = event.target.value
        newSearch[event.target.id] = selectedVal
        setSearch(newSearch)
    }
    const searchPost = (event) => {
        event.preventDefault()
        searchPosts(search.searchparam, true)
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

            <div className="abovePostList">
            <UncontrolledDropdown>
                    <DropdownToggle className= "btn btn-dark">Categories</DropdownToggle>
                    <DropdownMenu>
                        <CategoryList />
                    </DropdownMenu>
                </UncontrolledDropdown>
            <Button  className= "btn btn-dark" onClick={() => history.push(`/createpost`)}> Create Post</Button>
                <Form className="form" action="/" method="get">
                    
                    <label htmlFor="header-search">
                        <span className="visually-hidden">Search Posts</span>
                    </label>
                    <Input
                    style = {{width:"50%", height:"50%" }}
                        type="text"
                        id="searchparam"
                        placeholder="Search Posts"
                        name="s"
                        onChange={handleInputChange}
                    />
                    <Button type="submit"  className= "btn btn-dark" onClick={searchPost}>Search</Button>
                    
                </Form>
               
    
                <div className="postList">
                    {posts.map((post) => {

                        return (
                            <>
                                {post.isPurchased === false &&
                                    <Post post={post} key={post.id} loggedInUser={loggedInUser} />}
                            </>
                        )

                    })}
                </div>


            </div>
        </>
    );
}

export default PostList;