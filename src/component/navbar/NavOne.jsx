import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import Cookies from 'js-cookie';

const NavOne = () => {
  const login = localStorage.getItem('_book_access_user_login');
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (login) {
      setStatus(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove('_book_access_user_tokon_');
    localStorage.removeItem('_book_access_user_login');
    console.clear();
    window.location.href = '/login';
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand text-custom font-weight-bold">
          Book
          <span class="text-success ">App</span>
        </NavLink>

        {status ? (
          <>
            <div className="">
              <NavLink to="/upload" className="navup">
                Upload
              </NavLink>
              <button className="btn btn-primary" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default NavOne;
