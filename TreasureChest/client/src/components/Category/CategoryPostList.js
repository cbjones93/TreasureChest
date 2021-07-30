import React, { useEffect, useState } from "react";
import { getPostByCategoryId } from "../../modules/categoryManager";
import CategoryPost from "./CategoryPost";
import { useHistory, useParams  } from "react-router";
import CategoryList from '../Category/CategoryList'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  } from 'reactstrap';

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
            <UncontrolledDropdown>
              <DropdownToggle>Categories</DropdownToggle>
              <DropdownMenu>
                <CategoryList />
              </DropdownMenu>
              </UncontrolledDropdown>
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