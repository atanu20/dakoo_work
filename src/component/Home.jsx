import React, { useState, useEffect } from 'react';
import Search from './Search';
import axios from 'axios';
import { apilink } from '../ApiData';
import Movies from './Movies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from './DataContext';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [filalldata, setFilAllData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteritem, setFilterItem] = useState('all');

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

  const onSearch = async (e) => {
    e.preventDefault();

    if (search == '') {
    } else {
      if (filteritem === 'all') {
        getData(search);
      } else {
        const da = alldata.filter(
          (val) =>
            val.Type === filteritem &&
            val.Title.toLowerCase().includes(search.toLowerCase())
        );

        setFilAllData(da);
      }
    }
  };
  useEffect(() => {
    if (filteritem === 'all') {
      let it = search.length == 0 ? 'india' : search;
      getData(it);
    } else {
      const fildata = alldata.filter((val) => val.Type === filteritem);
      if (fildata.length == 0) {
        notify('No Data');
      } else {
        setFilAllData(fildata);
      }
    }
  }, [filteritem]);

  const getData = async (ser) => {
    setLoading(true);
    const res = await axios.get(`${apilink}&s=${ser}`);

    if (res.data.Response == 'True') {
      setFilAllData(res.data.Search);
      setAllData(res.data.Search);
    } else {
      notify(res.data.Error);
    }
    setLoading(false);
  };
  useEffect(() => {
    let it = search.length == 0 ? 'india' : search;
    getData(it);
  }, []);

  return (
    <>
      <ToastContainer />
      <Search
        onSearch={onSearch}
        filteritem={filteritem}
        setFilterItem={setFilterItem}
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <>
          <div className="container p-5">
            <div className="text-center">
              <h5>Data Loading...</h5>
            </div>
          </div>
        </>
      ) : (
        <>
          <Movies filalldata={filalldata} />
        </>
      )}
    </>
  );
};

export default Home;
