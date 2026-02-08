import axios from 'axios';
import React, { use, useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
       baseURL: 'https://grameen-loan-server.vercel.app'
})


const useAxiosSecure = () => {
       const {user, logOut} = useAuth();
       const navigate = useNavigate();
       useEffect(() =>{
              // intercept request 
     const reqInterceptor = axiosSecure.interceptors.request.use((config) =>{
                    config.headers.authorization = `Bearer ${user?.accessToken}`;
                    return config;
      })

//       interceptor response 
const resInterceptor = axiosSecure.interceptors.response.use((response) => {
       return response;
}, (error) => {
       console.log(error);

       const statusCode = error.status;
       if (statusCode === 401 || statusCode === 403) {
              logOut()
              .then(() => {
                     navigate('/login');
                     // successfully logged out
              })
              .catch((err) => {
                     console.log(err);
              });    

              // navigate to login page 
              return Promise.reject(error);
       }
});


return () => {
       axiosSecure.interceptors.request.eject(reqInterceptor);
       axiosSecure.interceptors.response.eject(resInterceptor);
};
}, [user, logOut, navigate]);
       return axiosSecure;
};

export default useAxiosSecure;