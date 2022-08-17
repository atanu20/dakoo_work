import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Error from './component/Error';
import Home from './component/Home';
import Movie from './component/Movie';
import Navbar from './component/Navbar';
import OneMovie from './component/OneMovie';
import { ConText } from './component/DataContext';
import AllFav from './component/fav/AllFav';
const App = () => {
  return (
    <>
      <ConText>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/movie/:id" component={OneMovie} />
          <Route exact path="/favourite" component={AllFav} />

          <Route component={Error} />
        </Switch>
      </ConText>
    </>
  );
};

export default App;
