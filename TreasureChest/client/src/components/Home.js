import React from "react";
import {  Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Home = (props) => {
console.log(props.activeUser)
    return (
        <Container className="text-white mt-5" style={{ backgroundColor: '#b18c5a' }} >

            <div>
                <h5 className="p-1">BUY. SELL. GET TECHED OUT.</h5>
                <div className="text-white">
                    <h6>
                        What is Treasure Chest?
                    </h6>
                    <p>
                        Treasure Chest is an online marketplace that facilitates consumer-to-consumer sales.
                        We aim to help consumers amid the global computer parts crisis and make it more affordable to build or upgrade their computers.
                    </p>
                    <p>
                        Make sure to follow your favorite users to see what other items they have in stock! Do this by visiting their account page and clicking on the follow user button.
                    </p>
                    <h6>
                        Go find some treasure!
                        </h6>
                    <p>
                        {props?.activeUser.id > 0 ?
                        <Link to="/posts">Start shopping now!</Link> 
                            :
                            <Link to="/login"> Get started now!</Link>
                        }
                    </p>

                </div>
            </div>

        </Container>
    )
}
export default Home