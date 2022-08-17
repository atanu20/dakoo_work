import React from 'react';
import { NavLink } from 'react-router-dom';
import Movie from './Movie';

const Movies = ({ filalldata }) => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {filalldata?.map((val) => {
            return (
              <>
                <Movie
                  image={val.Poster}
                  name={val.Title}
                  type={val.Type}
                  year={val.Year}
                  imdbID={val.imdbID}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Movies;
