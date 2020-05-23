import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FoodJokes from '../FoodJokes';

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

class RegisterForm extends Component {

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

        fetch('http://localhost:3333/api/register', requestOptions)
            .then(response => response.json())
            .then(console.log("Register succeed"))
            .then(data => {
                console.log(data)
                this.props.history.push('/')
            })
    }

    render() {
        return (

            <Form horizontal className="LoginForm" id="loginForm">
                <FormGroup controlId="formEmail">
                    <label for="email">Your Email:</label>
                    <FormControl type="email" placeholder="Email Address" onChange={this.handleChangeUsername.bind(this)} />
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <label for="password">Create your Password:</label>
                    <FormControl type="password" placeholder="Password" onChange={this.handleChangePassword.bind(this)} />
                </FormGroup>
                <FormGroup style={buttonStyle} controlId="formSubmit">
                    <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit.bind(this)}>Submit</Button>
                </FormGroup>
                <Router>
                    <Route path="/" component={FoodJokes} />
                </Router>
            </Form>
        )
    }
}

export default RegisterForm;
