import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate() //author of tutorial named it as "history"
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);

            }
            navigate(SHOP_ROUTE)
            user.setUser(user)
            user.setIsAuth(true)
        }catch (e){
            alert(e.response.data.message)
        }

    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder={"Enter your email..."}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"Enter your password..."}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Row className="mt-3">
                        <Col>
                            {isLogin ?
                                <div>
                                    Don't have an account? <NavLink to={REGISTRATION_ROUTE}
                                                                    style={{color: "blue"}}>Registration!</NavLink>
                                </div>
                                :
                                <div>
                                    Have an account? <NavLink to={LOGIN_ROUTE} style={{color: "blue"}}>Log in!</NavLink>
                                </div>}
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button

                                variant="outline-success"
                                onClick={click}


                            >
                                {isLogin ? 'Log in' : 'Registration'}
                            </Button>
                        </Col>
                    </Row>


                </Form>
            </Card>
        </Container>
    );
});

export default Auth;