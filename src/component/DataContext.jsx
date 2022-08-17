import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const getLocalItmes = () => {
  let list = localStorage.getItem('favcart');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('favcart'));
  } else {
    return {};
  }
};

export const ConText = (props) => {
  const [favcart, setFavCart] = useState(getLocalItmes());
  useEffect(() => {
    localStorage.setItem('favcart', JSON.stringify(favcart));
  }, [favcart]);

  return (
    <>
      <DataContext.Provider value={{ favcart, setFavCart }}>
        {props.children}
      </DataContext.Provider>
    </>
  );
};
