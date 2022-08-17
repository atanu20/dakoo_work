import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apilink } from '../ApiData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from 'react-simple-star-rating';
const OneMovie = () => {
  const [loading, setLoading] = useState(false);
  const [alldata, setAllData] = useState([]);
  const { id } = useParams();

  const notify = (msg) =>
    toast.dark(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get(`${apilink}&i=${id}`);

    if (res.data.Response == 'True') {
      setAllData(res.data);
    } else {
      notify(res.data.Error);
    }
    setLoading(false);
  }, [id]);
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row">
          {alldata.Title ? (
            <>
              <div className="col-md-6 mx-auto mb-3">
                <img src={alldata?.Poster} alt="" className="bigimg" />
              </div>
              <div className="col-md-6 mx-auto mb-3">
                <div className="card p-3">
                  <h2 className="text-primary font-weight-bold">
                    {alldata?.Title}
                  </h2>
                  <small>Released: {alldata?.Released}</small>
                  <div className="d-block">
                    <small class="badge badge-primary">
                      <i class="fa fa-trophy " aria-hidden="true"></i> &nbsp;
                      {alldata?.Awards}
                    </small>
                    &nbsp; &nbsp;
                    <p class="badge badge-primary">
                      Rating:
                      {alldata?.imdbRating}
                    </p>
                  </div>
                  <div>
                    <p className="">Actors: {alldata?.Actors}</p>
                    <p className="mt5">Director : {alldata?.Director}</p>
                  </div>
                  <div className="d-flex">
                    {alldata?.Genre?.split(',').map((val) => {
                      return (
                        <>
                          <span class="badge badge-success mr-1">{val}</span>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className="text-center">
                  <h2>Loading...</h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OneMovie;
