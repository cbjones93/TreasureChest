import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { getUserById } from "../../modules/authManager"

const MyAccount = (props) => {
    const [myAccount, setMyAccount] = useState({});
    const history = useHistory();

    let loggedInUser = props.activeUser
    console.log(loggedInUser)

    const getUser = () => {
        getUserById(loggedInUser.id)
            .then(account => setMyAccount(account));
    }
    useEffect(() => {
        getUser()
    }, []);
    return (
        <Card>
            <CardBody>
                <h5>Your Account Details</h5>
             <img src={loggedInUser.imageLocation} />
                <p>
                    <strong>{loggedInUser.firstName} {loggedInUser.lastName}</strong>
                    <p>Email: {loggedInUser.email}</p>
                    <p>Address: {loggedInUser.address} </p>
                 </p> 
            </CardBody>
        </Card>
    )
}
export default MyAccount