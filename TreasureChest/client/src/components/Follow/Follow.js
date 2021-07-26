import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Follow = ({ follow, loggedInUser }) => {
    console.log(follow.currentUserId)
    const history = useHistory()
    if (loggedInUser.id === follow.currentUserId) {
    return (
        <Card >
            < CardBody >
                    <img src={follow.user.imageLocation} />
                <p>
                    <strong>{follow.user.firstName} {follow.user.lastName}</strong>
                    <p>Email: {follow.user.email}</p>
                </p>

            </CardBody >
        </Card >
    )
    }
    else {
      return null;
    }
}
export default Follow;