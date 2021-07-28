import React, { useEffect, useState } from "react";
import { getPostByCategoryId } from "../../modules/categoryManager";
import CategoryPost from "./CategoryPost";
import { useHistory, useParams  } from "react-router";

const CategoryPostList = () => {
    const [posts, setPosts] = useState([])
    const history = useHistory();
    const { id } = useParams();

    const getPosts = () => {
        getPostByCategoryId(id).then(posts => setPosts(posts));
    };

    useEffect(() =>{
        getPosts()
    }, [id]);
    return (
        <>
            <div>
                <button onClick={() => history.push(`/createpost`)}> Create Post</button>
                {posts.map((post) => {

                    return (
                        <CategoryPost post={post} key={post.id} />)
                })}

            </div>
        </>
    )
}
export default CategoryPostList