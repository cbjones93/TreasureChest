import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

const PostForm = () => {
    const [post, setPost] = useState({
        name: "",
        description: "",
        imageLocation: "",
        price: "",
        categoryId: 0
    })
    const history = useHistory();
    const [category, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories()
        .then(category => setCategories(category));
    }
    useEffect(() => {
        getCategories()
    }, []);


    const handleInputChange = (event) => {
        const newPost = { ...post }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newPost[event.target.id] = selectedVal
        setPost(newPost)
    }

    const handleClickSavePost = (event) => {
        event.preventDefault()
        createPost(post)
            .then(() => {
                history.push("/posts");
            })
    }
    const handleCancelSave = (event) => {
        event.preventDefault()
        history.push('/posts')
    }


    return (
        <form className="postForm">
            <h2 className="postForm_title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Post Title"
                        value={post.name}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Description: </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        required autoFocus
                        className="form-control"
                        placeholder="Post Content"
                        value={post.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlfor="title">Image URL</label>
                    <input
                        type="text"
                        name="imageLocation"
                        id="imageLocation"
                        className="form-control"
                        placeholder="Header Image Url"
                        value={post.imageLocation}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Price: </label>
                    <input
                    type="number"
                       
                        value={post.price}
                        name="price"
                        id="price"
                        onChange={handleInputChange}
                        className="form-control"
                    >
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                    <select
                    type="number"
                        value={post.categoryId}
                        name="categoryId"
                        id="categoryId"
                        onChange={handleInputChange}
                        className="form-control"
                    >
                         <option value ="0"> Select a Category</option>
                {category.map(cat => (
                    <option key ={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSavePost}>Submit Post</button>
            <button className="btn btn-primary" onClick={handleCancelSave}>Cancel</button>
        </form>
    )
}

export default PostForm