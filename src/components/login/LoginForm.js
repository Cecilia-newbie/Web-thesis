import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//const history = useHistory();

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: -100
};

const panelStyle = {
    backgroundColor: 'rgba(255,255,255,0.5)',
    border: 0,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
};

const buttonStyle = {
    marginBottom: 0
};

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChangeUsername(username) {
        this.setState({ username: username.target.value })
    }

    handleChangePassword(password) {
        this.setState({ password: password.target.value })
    }

    handleFormSubmit(e) {
        e.preventDefault()
        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            }
            )
        };

        fetch('http://localhost:3333/api/login', requestOptions)
            .then(response => response.json())
            .then(console.log("Login succeed"))
            .then(data => {
                console.log(data)
                
            })
    }

    render() {
        return (

            <Form horizontal className="LoginForm" id="loginForm">
                <FormGroup controlId="formEmail">
                    <label for="email">Your email:</label>
                    <FormControl type="email" placeholder="Email Address" onChange={this.handleChangeUsername.bind(this)} />
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <label for="password">Your password:</label>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChangePassword.bind(this)} />
                </FormGroup>
                <FormGroup class="checkbox">
                    <label><input type="checkbox" /> Remember me</label>
                </FormGroup>
                <FormGroup style={buttonStyle} controlId="formSubmit">
                    <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit.bind(this)}>Log In</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default LoginForm;
