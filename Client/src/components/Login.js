
import React, { useState } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom'
import { Card, Container, Row } from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
var ENDPOINT = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
    ENDPOINT = `https://ie-code-collaborator.herokuapp.com`
}
const Login = () => {
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword, togglePassword] = useState(false)


    const PostData = () => {

        fetch(`${ENDPOINT}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        
        <Container>
            <Navbar id="Navbar" className="navbar_main_container" bg="primary" variant="dark" expand="lg">
            <Navbar.Brand className="navLinks navBrand" href="/"><h1>CodeCollab </h1> </Navbar.Brand>
            <Navbar.Toggle id="navbar_toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/signup" className="nav-link" > Sign Up</Link>
                    <Link to="/signin" className="nav-link" > Sign In</Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <Row className="justify-content-md-center">
                <div className="col-12 col-md-6 card-login">
                    <Paper elevation={3} >
                        <Card className="text-center">
                            <Card.Header><h2>Sign In</h2></Card.Header>
                            <Card.Body>

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="email-field">Email*</InputLabel>
                                    <Input
                                        id="email-field"
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <EmailIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
                                    <Input
                                        required
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPasword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => togglePassword(!showPassword)}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Link to="/signup">Don't have an account? Sign Up</Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => PostData()}
                                    endIcon={<InputIcon />}
                                >
                                    Sign In
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Paper>
                </div>
            </Row>
        </Container>
    )
}


export default Login