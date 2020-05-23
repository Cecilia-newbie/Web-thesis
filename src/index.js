import React from 'react';
import ReactDOM from 'react-dom';
import CelebrityJokes from './components/CelebrityJokes';
import FoodJokes from './components/FoodJokes';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={FoodJokes}/>
        <Route path="/special" component={CelebrityJokes} onEnter={requireAuth} />
        <Route path="/callback" component={Callback} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));