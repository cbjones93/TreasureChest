import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager.js";
import Post from "./Post"
import { useHistory } from "react-router";



const PostList = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {/* <button className="btn btn-primary" onClick={() => history.push("/posts/add")}>Create Post</button> */}
            <div>
                <button onClick={() => history.push(`/createpost`)}> Create Post</button>
                {posts.map((post) => {

                    return (
                        <Post post={post} key={post.id} />)
                })}

            </div>
        </>
    );
}

export default PostList;