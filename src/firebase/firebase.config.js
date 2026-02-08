// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket:  import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyD7YNQ68fV9BPTMlEp7V0PGzTEnSLzviA0",
  authDomain: "sidebyside-loans.firebaseapp.com",
  projectId: "sidebyside-loans",
  storageBucket: "sidebyside-loans.firebasestorage.app",
  messagingSenderId: "229338225511",
  appId: "1:229338225511:web:f9f16cdfed2f5d535cedc2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export default app;

