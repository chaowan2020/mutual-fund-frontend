import React, { createContext, useState } from 'react';

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [fundDetail, setFundDetail] = useState([]);
  const [id, setId] = useState('');

  return (
    <FundContext.Provider value={{ fundDetail, setFundDetail, id, setId }}>
      {children}
    </FundContext.Provider>
  );
};
