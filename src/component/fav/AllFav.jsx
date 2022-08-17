import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../DataContext';
import Fav from './Fav';

const AllFav = () => {
  const { favcart } = useContext(DataContext);
  const [itemarr, setItemArr] = useState([]);
  //   console.log(favcart);
  const his = useHistory();
  useEffect(() => {
    let a = [];
    if (favcart.items) a = Object.keys(favcart.items);
    // setItemArr(a);
    let newar = [];
    for (let v of a) {
      let newobj = {};
      newobj['idd'] = v;
      newar.push(newobj);
    }
    setItemArr(newar);
  }, []);
  //   console.log(itemarr);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {itemarr.length == 0 ? (
            <>
              <div className="container">
                <div className="text-center">
                  <h3>No Items</h3>
                </div>
              </div>
            </>
          ) : (
            <>
              {itemarr?.map((val) => {
                return (
                  <>
                    <Fav mid={val.idd} />
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllFav;
