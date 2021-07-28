import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Category from "./Category";
import { getAllCategories } from "../../modules/categoryManager";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

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
                key = {category.id} />
            )
        }))}
        </>
    )
}

export default CategoryList