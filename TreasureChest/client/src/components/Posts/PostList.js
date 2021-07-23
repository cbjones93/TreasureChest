import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager.js";
import Post from "./Post"


const PostList = () => {
    const [posts, setPosts] = useState([]);


    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    },[]);

    return (
    <>
    {/* <button className="btn btn-primary" onClick={() => history.push("/posts/add")}>Create Post</button> */}
<div>
    {posts.map((post) => {
        console.log(post)
        return (
            <Post post={post} key={post.id} />)
    })}

</div>
</>
);
}

export default PostList;