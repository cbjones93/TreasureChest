// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router";
// import MyAccount from "./myAccountCard";
// import { getUserById } from "../../modules/authManager"


// const MyAccountList = (props) => {
//     const [myAccount, setMyAccount] = useState([]);
//     const history = useHistory();

//     let loggedInUser = props.activeUser
//     console.log(loggedInUser)

//     const getUser = () => {
//         getUserById(loggedInUser.id)
//             .then(account => setMyAccount(account));
//     }
//     useEffect(() => {
//         getUser()
//     }, []);

//     return (
//         <>
//                 <MyAccount user={user}
//                     key={user.id}
//                     loggedInUser={loggedInUser} />
          
//         </>

//     )
// }


// export default MyAccountList