import React from "react";
import { Card, CardBody, DropdownItem } from "reactstrap";
import { Link, useHistory } from "react-router-dom";


const Category = ({category}) => {
    const history = useHistory() 
    return (
        
    <DropdownItem tag ={Link} to={`/categoryPost/${category.id}`} >
       {category.name}
    </DropdownItem>
    )
}

export default Category