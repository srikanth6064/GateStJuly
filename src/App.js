import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route,  Redirect} from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Marketing from './components/pages/Marketing';
import Consulting from './components/pages/Consulting';
import Login from './components/pages/Login';
import Forgot from './components/pages/Forgot';
import {isAuthenticated} from './Auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated() === true  ? <Component {...props} /> : <Redirect to="/" />
    )}
  />
);
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/forgot' component={Forgot} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/services' component={Services} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/contact-us' component={ContactUs} />
        <PrivateRoute path='/marketing' component={Marketing} />
        <PrivateRoute path='/consulting' component={Consulting} />
      </Switch>
    </Router>
  );
}

export default App;
