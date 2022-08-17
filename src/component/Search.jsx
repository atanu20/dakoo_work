import React, { useState } from 'react';

const Search = ({ onSearch, filteritem, setFilterItem, search, setSearch }) => {
  return (
    <div className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-10 col-12 mx-auto">
            <form onSubmit={onSearch}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <select
                    class="form-control"
                    onChange={(e) => setFilterItem(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="movie">Movies</option>
                    <option value="episode">Episodes</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Serach . . ."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                />
                <div class="input-group-append">
                  <button class="btn btn-three-mix" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
