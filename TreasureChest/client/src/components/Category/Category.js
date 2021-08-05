import React from "react";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";


const Category = ({category}) => {
   
    return (
        
    <DropdownItem tag ={Link} to={`/categoryPost/${category.id}`} >
       {category.name}
    </DropdownItem>
    )
}

export default Category