import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { editUser, getUserById } from "../../modules/authManager";

export const UserEdit = (props) => {
    const [user, setUser] = useState({})
    const history = useHistory();

    const getUser = () => {
        getUserById(props.activeUser?.id)
            .then(account => setUser(account));
    }

    const handleInputChange = (event) => {
        const newUser = {...user}
        let selectedVal = event.target.value
        newUser[event.target.id] = selectedVal
        setUser(newUser)
    }

    useEffect(() => {
     getUser()
    }, [props])

    const handleClickSaveUser = (event) => {
        event.preventDefault()
        if (user.firstName === "" || user.lastName === "" || user.email ==="" || user.address === "" || user.imageLocation ===""){
            window.alert("Please fill in all fields")
        }
     
        else {
            editUser(user)
            .then(() => history.push('/myaccount'))
        }
    }
    const handleCancelSave = (event) => {
        event.preventDefault()
        history.push('/myaccount')
    }

    return (
        <form className="postForm">
        <h2 className="postForm_title">Edit Account</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">First Name </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleInputChange}
                    required autoFocus
                    className="form-control"
                    placeholder="First Name"
                    value={user.firstName}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Last Name </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleInputChange}
                    required autoFocus
                    className="form-control"
                    placeholder="last Name"
                    value={user.lastName}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Email </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    required autoFocus
                    className="form-control"
                    placeholder="Email"
                    value={user.email}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="content">Address: </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    required autoFocus
                    className="form-control"
                    placeholder="Address"
                    value={user.address}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="content">Image Url </label>
                <input
                    type="text"
                    name="imageLocation"
                    id="imageLocation"
                    required autoFocus
                    className="form-control"
                    placeholder="Image Location"
                    value={user.imageLocation}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
      
        <button className="btn btn-primary" onClick={handleClickSaveUser}>Save Changes</button>
        <button className="btn btn-primary" onClick={handleCancelSave}>Cancel</button>
    </form>
    )
}