import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUserById } from "../../modules/authManager"
import { addFollow, deleteFollow, getAllFollowsByUserId } from "../../modules/followManager";

const UserAccount = (props) => {
    const { id } = useParams();
    const [follows, setFollows] = useState([]);
    const [isFollowed, setIsFollowed] = useState()
    const [userAccount, setUserAccount] = useState({});
    const history = useHistory();

    const handleDeleteFollow = (id) => {
        window.confirm(`Are you sure you want to remove ${userAccount.firstName} ${userAccount.lastName} From your favorite sellers?`);
        deleteFollow(id)
       
    }

    const getUser = () => {
        getUserById(id)
            .then(account => setUserAccount(account));
    }
    const getFollows = () => {

        getAllFollowsByUserId(props.activeUser.id)
            .then(follow => setFollows(follow));

    };

    const handleAddFollow = () => {
        setIsFollowed(true)
        const newUserObject = {
            "userId": id,
        }
        addFollow(newUserObject)
    }

    useEffect(() => {
        if (props.activeUser.id === undefined) {
            getUser()
        }
        if (props.activeUser.id !== undefined) {
            getFollows()
        }
    }, [userAccount]);




    return (
        <>
            <Card>
                <CardBody>
                    <h5> {userAccount.firstName} {userAccount.lastName}'s Account Page</h5>
                    <img src={userAccount.imageLocation} />
                    <div>
                        <strong></strong>
                        <p>Email: {userAccount.email}</p>
                        <p>Address: {userAccount.address} </p>
                    </div>
                    {follows?.find(follow => follow.user.id != id) ?
                         <button onClick={handleAddFollow}> Follow this user!</button>
                         :
                         <>
                         <p>You're following this user!</p>
                         {/* <button onClick={handleDeleteFollow}>  Unfollow User </button> */}
                         </> }


                </CardBody>
            </Card>
        </>
    )
}

export default UserAccount