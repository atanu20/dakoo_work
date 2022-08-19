import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import ReactPaginate from 'react-paginate';
import { apilink } from '../../data/fdata';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
  const atokon = Cookies.get('_book_access_user_tokon_');
  const [myinfo, setMyInfo] = useState([]);
  const [allbookinfo, setAllBookInfo] = useState([]);
  const [onebookinfo, setOneBookInfo] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [oneloading, setOneLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const perpage = 5;
  const pagevisit = pageNo * perpage;

  const dataall = allbookinfo?.slice(pagevisit, pagevisit + perpage);
  const boxno = Math.ceil(allbookinfo?.length / perpage);

  const likedChange = ({ selected }) => {
    setPageNo(selected);
  };

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
      getallbook();
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

  const getallbook = async () => {
    setLoading(true);

    const res = await axios.get(`${apilink}/api/getAllBooks`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setAllBookInfo(res.data.msgs);
    } else {
      notify(res.data.msg);
    }
    setLoading(false);
  };

  const getIdData = async (id) => {
    setOneLoading(true);

    const res = await axios.get(`${apilink}/api/book/${id}`, {
      headers: {
        Authorization: atokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      setOneBookInfo(res.data.msgs);
    } else {
      notify(res.data.msg);
    }
    setOneLoading(false);
  };
  const bookDel = async (id) => {
    const res = await axios.get(`${apilink}/api/delete/${id}`, {
      headers: {
        Authorization: atokon,
      },
    });
    console.log(res.data);
    if (res.data.success) {
      getallbook();
    } else {
      notify(res.data.msg);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="home">
        <div className="container">
          <h3>ALL Books</h3>
          <div className="card p-3">
            {loading && (
              <>
                <div className="text-center">
                  <h5>Loading...</h5>
                </div>
              </>
            )}
            {dataall.length == 0 ? (
              <>
                <div className="text-center">
                  <h5>No Data</h5>
                </div>
              </>
            ) : (
              <>
                <div className="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Image</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataall?.map((val) => {
                        return (
                          <>
                            <tr>
                              <td>{val.name}</td>
                              <td>{val.author}</td>
                              <td>
                                <img src={val.image} alt="" className="smimg" />
                              </td>
                              <th>{val.pages}</th>
                              <th>{val.price}</th>
                              <th>
                                <div className="optab">
                                  <i
                                    class="fa fa-eye text-success"
                                    aria-hidden="true"
                                    data-toggle="modal"
                                    data-target={`#myModal${val._id}`}
                                    onClick={() => getIdData(val._id)}
                                  ></i>
                                  <NavLink to={`/edit/${val._id}`}>
                                    <i
                                      class="fa fa-pencil-square-o text-warning"
                                      aria-hidden="true"
                                    ></i>
                                  </NavLink>
                                  <i
                                    class="fa fa-trash-o text-danger"
                                    aria-hidden="true"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          'Are you sure about Delete?'
                                        )
                                      )
                                        bookDel(val._id);
                                    }}
                                  ></i>
                                </div>
                              </th>
                            </tr>
                            <div class="modal fade" id={`myModal${val._id}`}>
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                  {oneloading ? (
                                    <>
                                      <div className="text-center p-2">
                                        <CircularProgress size={45} />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div class="modal-header">
                                        <h4 class="modal-title">
                                          {onebookinfo?.name}
                                        </h4>
                                        <button
                                          type="button"
                                          class="close"
                                          data-dismiss="modal"
                                        >
                                          &times;
                                        </button>
                                      </div>

                                      <div class="modal-body">
                                        <h5>Name: {onebookinfo?.name}</h5>
                                        <h5>Author: {onebookinfo?.author}</h5>
                                        <h5>Price: {onebookinfo?.price}</h5>
                                        <h5>Pages: {onebookinfo?.pages}</h5>
                                        <h5>
                                          Published:{' '}
                                          {new Date(
                                            onebookinfo?.publish
                                          ).toLocaleDateString()}
                                        </h5>
                                        <img
                                          src={onebookinfo?.image}
                                          alt=""
                                          className="bigimg"
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          <div className="row">
            <ReactPaginate
              previousLabel={'Prev'}
              nextLabel={'Next'}
              pageCount={boxno}
              onPageChange={likedChange}
              containerClassName={'pagination'}
              // previousLinkClassName={"prevbutton"}
              // nextLinkClassName={"nextbutton"}
              // disabledClassName={"pagedisable"}
              activeClassName={'activebutton'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
