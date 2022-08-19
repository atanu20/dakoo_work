import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/Error';

import './App.css';
// import Navbar from './component/navbar/NavBar';
import NavOne from './component/navbar/NavOne';
import LoginU from './pages/auth/LoginU';
import Register from './pages/auth/Register';
import UploadBook from './pages/home/UploadBook';
import EditBook from './pages/home/EditBook';

const App = () => {
  return (
    <>
      <NavOne />
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LoginU} />

        <Route exact path="/upload" component={UploadBook} />
        <Route exact path="/edit/:bookid" component={EditBook} />

        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;
