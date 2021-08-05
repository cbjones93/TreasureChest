import React, { useEffect, useState } from "react";

import Category from "./Category";

import { getAllCategories } from "../../modules/categoryManager";

const CategoryList = (props) => {
    const [categories, setCategories] = useState([]);


    let loggedInUser = props.activeUser
    

    const getCategories = () => {
        getAllCategories()
        .then(category => setCategories(category));
    }

    useEffect(() => {
        getCategories()
    }, []);

    return (
        <>
        {categories.map((category => {
            return (
                <Category category = {category}
                key = {category.id}
                loggedInUser={loggedInUser} />
            )
        }))}
        </>
    )
}

export default CategoryList