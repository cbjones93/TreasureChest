import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Form, FormGroup, Button, Container } from "reactstrap";
import { editPost, getPostById } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

export const PostEdit = () => {
    const [post, setPost] = useState({})
    const { id } = useParams();
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
            const newPost = {...post}
            let selectedVal = event.target.value
            newPost[event.target.id] = selectedVal
            setPost(newPost)
        }

    const handleClickSavePost = (event) => {
        event.preventDefault()
        if (post.name === "" || post.description === "" || post.price === "" || post.category?.id === 0){
            window.alert("Please fill in all fields")
        }
        else if (post.price === 0) {
            window.alert("Price cannot be 0")
        }
        
        else {
            post.categoryId = post.category.id
            editPost(post)
            .then(() => history.push('/posts'))
        }
    }
    const handleCancelSave = (event) => {
        event.preventDefault()
        history.push('/posts')
    }
    useEffect(() => {
        getPostById(id).then(setPost)
    }, [id])
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
                    defaultValue = {post.category?.id}
                    type="number"
                        value={post.category?.id}
                        name="categoryId"
                        id="categoryId"
                        onChange={handleInputChange}
                        className="form-control"
                    >
                         <option value ="0"> Select a Category</option>
                {category.map(cat => (
                   post.category?.id == cat.id ? 
                   <option key ={cat.id} selected value={cat.id}>{cat.name}</option>
                    : <option key ={cat.id} value={cat.id}>{cat.name} </option>
                   
                ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSavePost}>Submit Post</button>
            <button className="btn btn-primary" onClick={handleCancelSave}>Cancel</button>
        </form>
    )
}

export default PostEdit

