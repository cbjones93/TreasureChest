import React, { useEffect, useState } from "react";
import Post from "./Post"
import { getAllPosts, searchPosts } from "../../modules/postManager.js";

export const Search = () => {
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    const handleSearch = (event) => {
        let searchInput = event.target.value

        if (searchInput.length > 0) {
            let searchMatch = videos.filter(posts => {
                if (posts.name.toLowerCase().includes(searchInput.oLowerCase())) {
                    return true
                }

            })
            setSearch(searchMatch)
        }
        else if (searchInput == 0) {
            getPosts()
        }
        else {
            getPosts()
        }
    }

        useEffect(() => {
            getPosts();
        }, [posts]);
        useEffect(() => {
            searchPosts()
        }, [search])
        return (
            <>
              <div className="container">
                <div className="row justify-content-center">
                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                </div>
            </div>
            <section className="event_search">
                <div>
                    <input
                        type='text'
                        className="search"
                        required onChange={handleSearch}
                        id="search_box"
                        placeholder="Search" />
                </div>
            </section>
            <div className="section_content">

            </div>
            </>
        )
    }
