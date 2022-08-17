import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { DataContext } from './DataContext';
import './Nav.css';

const Navbar = () => {
  const { favcart } = useContext(DataContext);
  const his = useHistory();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand text-custom font-weight-bold">
          Dakoo
          <span class=" dot ">OMDB</span>
        </NavLink>

        <button
          className="btn btn-outline-danger"
          onClick={() => his.push('/favourite')}
        >
          <i class="fa fa-heart" aria-hidden="true"></i>{' '}
          {favcart.Totalitems ? favcart.Totalitems : 0}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
