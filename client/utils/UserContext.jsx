// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [adminId, setAdminId] = useState('');

  return (
    <UserContext.Provider value={{ userId, adminId, setUserId, setAdminId }}>
      {children}
    </UserContext.Provider>
  );
};
