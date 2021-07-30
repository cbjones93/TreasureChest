import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Category from "./Category";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
  } from 'reactstrap';
import { getAllCategories } from "../../modules/categoryManager";

const CategoryList = (props) => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    let loggedInUser = props.activeUser
    console.log(loggedInUser) 

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