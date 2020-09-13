import React from 'react';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/users/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='GitHub Finder' icon='fa fa-github' />
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
