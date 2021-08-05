import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


const Follow = ({ follow, loggedInUser }) => {
    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
      }
    if (loggedInUser?.id === follow.currentUserId) {
        return (
            <Card className="follow" style={{ width: '18rem' }} >
                < CardBody >
                    <img style={imgStyle} src={follow.user.imageLocation} />
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