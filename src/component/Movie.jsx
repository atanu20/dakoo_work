import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from './DataContext';

const Movie = ({ name, image, imdbID, type, year }) => {
  const { favcart, setFavCart } = useContext(DataContext);

  const AddToFav = () => {
    let GlobalCart = { ...favcart };
    if (!GlobalCart.items) {
      GlobalCart.items = {};
    }

    if (!GlobalCart.Totalitems) {
      GlobalCart.Totalitems = 0;
    }

    if (GlobalCart.items[imdbID]) {
      GlobalCart.items[imdbID] = 1;
    } else {
      GlobalCart.items[imdbID] = 1;
      GlobalCart.Totalitems += 1;
    }

    setFavCart(GlobalCart);

    // console.log(GlobalCart);
  };
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-3">
        <div className="card">
          <img src={image} alt="" className="imgg" />
          <div className="p-2">
            <NavLink to={`/movie/${imdbID}`} className="mlink">
              <h5>{name}</h5>
            </NavLink>
            <small>{type.toUpperCase()}</small>

            <div className="dflex">
              <p>Release Year: {year}</p>

              <button
                className="btn btn-outline-danger"
                onClick={() => AddToFav()}
              >
                <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
