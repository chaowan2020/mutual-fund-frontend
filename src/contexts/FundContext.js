import React, { createContext, useState } from 'react';

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [fundDetail, setFundDetail] = useState([]);
  const [id, setId] = useState('');
  const [overview, setOverview] = useState(null);


  return (
    <FundContext.Provider value={{ fundDetail, setFundDetail, id, setId, overview, setOverview }}>
      {children}
    </FundContext.Provider>
  );
};
