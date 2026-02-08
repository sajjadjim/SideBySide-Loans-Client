

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] =useState(null);
  const [loading, setLoading] =useState(true);
  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

const signInGoogle = () =>{
    setLoading(true)
  return signInWithPopup(auth, googleProvider);
}

const logOut = () =>{
      setLoading(true);
  return signOut(auth);
}

const updateUserProfile = (profile) =>{
  return updateProfile(auth.currentUser, profile)
}

useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser);
      setLoading(false);
      // console.log(currentUser)

 })
 return() => {
  unsubscribe();
 }
}, [])

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
