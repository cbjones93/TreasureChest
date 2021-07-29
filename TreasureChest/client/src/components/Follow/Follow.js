import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Follow = ({ follow, loggedInUser }) => {
    console.log(follow.currentUserId)
    const history = useHistory()
    if (loggedInUser?.id === follow.currentUserId) {
        return (
            <Card >
                < CardBody >
                    <img src={follow.user.imageLocation} />
                    <div>
                        <Link to={`../../users/${follow.user.id}`}>
                            <strong>{follow.user.firstName} {follow.user.lastName}</strong>
                        </Link>
                        <p>Email: {follow.user.email}</p>
                    </div>

                </CardBody >
            </Card >
        )
    }
    else {
        return null;
    }
}
export default Follow;