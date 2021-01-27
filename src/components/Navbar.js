import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = (props) => {
    return (
        <Navbar id="Navbar" className="navbar_main_container" bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="navLinks navBrand" href="/"><h1>CodeCollab </h1> </Navbar.Brand>
            <Navbar.Toggle id="navbar_toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="navLinks" href="/"> Home </Nav.Link>
                    <Nav.Link className="navLinks" href="/info" > Info</Nav.Link>
                    <Nav.Link className="navLinks" href="/projects"> Projects </Nav.Link>
                    <Nav.Link className="navLinks" href="/editor"> Editor </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;