import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';

const Header = (props) => {
    const history = useHistory()
   /* const jwt=JSON.parse(localStorage.getItem("jwt"));
    if(jwt)
    {*/
    return (
        <Navbar id="Navbar" className="navbar_main_container" bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="navlinks "> <h1>CodeCollab </h1></Navbar.Brand>
            <Navbar.Toggle id="navbar_toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <a href="/" className="nav-link" > Home</a>
                </Nav>
                <Nav class="ml-auto">
                    <Link className="nav-link"><Button variant="contained"
                        color="primary" endIcon={<ExitToAppIcon />} onClick={() => {
                            localStorage.clear()
                            history.push('/login')
                        }}>Logout</Button></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
    //}
    /*else{
        return (
        <Navbar id="Navbar" className="navbar_main_container" bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="navLinks navBrand" href="/"><h1>CodeCollab </h1> </Navbar.Brand>
            <Navbar.Toggle id="navbar_toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link" > Home</Link>
                    <Link to="/info" className="nav-link"> Info</Link>
                </Nav>
                <Nav class="ml-auto">
                    <Link className="nav-link"><Button variant="contained"
                        color="primary" endIcon={<ExitToAppIcon />} onClick={() => {
                            localStorage.clear()
                            history.push('/signin')
                        }}>Logout</Button></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
    }*/


}

export default Header;
