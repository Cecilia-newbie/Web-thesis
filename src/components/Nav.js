import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import RegisterPage from './register/RegisterPage';
import LoginPage from './login/LoginPage';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const Register = () => (
  <RegisterPage />);

  const Login = () => (
    <LoginPage />);

class Nav extends Component {
  render() {
    return (
      <div class="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Chuck Norris World</Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Food Jokes</Link>
            </li>
            <li>
              {
                (isLoggedIn()) ? <Link to="/special">Celebrity Jokes</Link> : ''
              }
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
                                      
                <Link to="/login" className="btn btn-info log">Log In</Link>
              
            </li>
            <li>
              <Link to="/register" className="btn btn-link">Register</Link>
            </li>
          </ul>
        </nav>
        <Router>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}
// (isLoggedIn()) ? (<button className="btn btn-danger log" onClick={() => logout()}>Log out </button>) : (<button className="btn btn-info log" onClick={() => login()}>Log In</button>)
export default Nav;
