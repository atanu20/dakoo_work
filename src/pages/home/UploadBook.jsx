import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

import { apilink } from '../../data/fdata';
import { CircularProgress } from '@material-ui/core';

const UploadBook = () => {
  const atokon = Cookies.get('_book_access_user_tokon_');
  const [myinfo, setMyInfo] = useState([]);
  const [bookimg, setBookimg] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [pages, setPages] = useState('');
  const [author, setAuthor] = useState('');

  const history = useHistory();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

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
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      history.push('/login');
    } else {
      getalldata();
    }
  }, []);

  const getalldata = async () => {
    const res = await axios.get(`${apilink}/api/infor`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setMyInfo(res.data.user);
    } else {
      notify(res.data.msg);
    }
  };

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(bookimg);
    if (bookimg.size > 2000000) {
      setStatus(true);
      setMsg('File should be less then 2 MB');
    } else {
      if (
        bookimg.type === 'image/jpeg' ||
        bookimg.type === 'image/jpg' ||
        bookimg.type === 'image/png'
      ) {
        let formData = new FormData();
        formData.append('file', bookimg);
        formData.append('upload_preset', 'facebook');
        const resone = await axios.post(
          'https://api.cloudinary.com/v1_1/du9emrtpi/image/upload',
          formData
        );
        // console.log(resone.data);
        const data = {
          image: resone.data.secure_url,
          name,
          author,
          price,
          pages,
          userId: myinfo._id,
        };

        let res = await axios.post(`${apilink}/api/uploadbook`, data, {
          headers: {
            Authorization: atokon,
          },
        });
        if (res.data.success) {
          history.push('/');
        } else {
          notify(res.data.msg);
        }
      } else {
        setStatus(true);
        setMsg('Only jpg ,jpeg and PNG');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card p-3">
                {status ? (
                  <>
                    <div class="alert alert-warning alert-dismissible">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}
                <h3 className="text-center pb-3">Upload Book</h3>
                <br />
                <form onSubmit={onSub} className="">
                  <div className="form-group ">
                    <input
                      type="text"
                      placeholder="Book Name"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Author Name"
                      className="form-control"
                      name="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Total Pages"
                      className="form-control"
                      name="pages"
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Total Price"
                      className="form-control"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="file"
                      placeholder="Total Price"
                      className="form-control"
                      name="price"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setBookimg(e.target.files[0])}
                      required
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn btn-primary' : 'btn btn-primary'
                      }
                      disabled={loading}
                    >
                      Upload
                    </button>
                  </div>
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress size={45} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadBook;
