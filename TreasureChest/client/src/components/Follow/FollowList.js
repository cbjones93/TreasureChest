import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Follow from "./Follow";
import { getAllFollows } from "../../modules/followManager";

const FollowList = (props) => {
    const [follows, setFollows] = useState([]);
    const history = useHistory();

 
    const getFollows = () => {
        getAllFollows()
        .then(follow => setFollows(follow));
    };

    let loggedInUser = props.activeUser
    console.log(loggedInUser) 

    useEffect(() => {
        getFollows()
    }, []);

    return (
        <>
                <h5> Your Favorite Sellers</h5>
            {follows.map((follow => {
                return (
                    <Follow follow={follow}
                        key={follow.id}
                        loggedInUser={loggedInUser}
                    />
                )
            }))}
        </>
    )
}
export default FollowList