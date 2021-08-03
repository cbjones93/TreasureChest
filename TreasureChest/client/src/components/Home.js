import React from "react";
import { Card, CardBody, Container, Media } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Home = (props) => {
    console.log(props.activeUser)
    return (
        <Container style={{backgroundColor: 'rgb(64 66 70)'}} >
        <Card>
            <CardBody>
        <div>
        <h5>BUY. SELL. GET TECHED OUT.</h5>
        <div>
            <h6>
What is Treasure Chest?
            </h6>
            <p>
                Treasure Chest is an online marketplace that facilitates consumer-to-consumer sales.
                We aim to help consumers amid the global computer parts crisis and make it more affordable to build or upgrade their computers.
                {props?.activeUser.id > 0  ?
                <> </>
                :
                <Link to="/login">Get started now!</Link>
            }
            </p>

        </div>
        </div>
        </CardBody>
        </Card>
        </Container>
    )
}
export default Home