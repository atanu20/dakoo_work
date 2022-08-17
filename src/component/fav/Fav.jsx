import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apilink } from '../../ApiData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fav = ({ mid }) => {
  const [loading, setLoading] = useState(false);
  const [alldata, setAllData] = useState([]);

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
    const res = await axios.get(`${apilink}&i=${mid}`);

    if (res.data.Response == 'True') {
      setAllData(res.data);
    } else {
      notify(res.data.Error);
    }
    setLoading(false);
  }, [mid]);
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-3">
        <div className="card">
          <img src={alldata?.Poster} alt="" className="imgg" />
          <div className="p-2">
            <NavLink to={`/movie/${alldata?.imdbID}`} className="mlink">
              <h5>{alldata?.Title}</h5>
            </NavLink>
            <small>{alldata?.Type?.toUpperCase()}</small>

            <div className="dflex">
              <p>Release Year: {alldata?.Released}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fav;
