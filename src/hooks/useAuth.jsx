import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
       // const authInfo = use(AuthContext);
       // return authInfo;
       return useContext(AuthContext);
};

export default useAuth;