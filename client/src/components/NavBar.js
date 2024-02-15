import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }


    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink className="me-auto" style={{color: 'white'}} to={SHOP_ROUTE}>BuyDevice</NavLink>
                {user.isAuth ?
                    <Nav style={{color: 'white', marginRight: -120}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)} // Исправлено на вызов функции с путем


                        >
                            Admin panel
                        </Button>


                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ms-2"
                        >
                            Log out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }

            </Container>
        </Navbar>

    );
});


export default NavBar;