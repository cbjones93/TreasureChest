import React, { useEffect, useState } from "react";

import Follow from "./Follow";
import { getAllFollows } from "../../modules/followManager";
import { CardBody, Container, Card } from "reactstrap";


const FollowList = (props) => {
    const [follows, setFollows] = useState([]);


 
    const getFollows = () => {
        getAllFollows()
        .then(follow => setFollows(follow));
    };

    let loggedInUser = props.activeUser
  

    useEffect(() => {
        getFollows()
    }, []);

    return (
        <Container>
            <Card>
                <CardBody>
                <h5> Your Favorite Sellers</h5>
            {follows.map((follow => {
                return (
                    <Follow follow={follow}
                        key={follow.id}
                        loggedInUser={loggedInUser}
                    />
                )
            }))}
            </CardBody>
            </Card>
        </Container>
    )
}
export default FollowList