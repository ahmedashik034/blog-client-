import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const initializeConfigue = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDhTD_0gJSzV9dZNj0efm_B-SyGQp5oFGQ",
    authDomain: "redux-rapper.firebaseapp.com",
    projectId: "redux-rapper",
    storageBucket: "redux-rapper.appspot.com",
    messagingSenderId: "1044025783853",
    appId: "1:1044025783853:web:45a8814c29f0b43edf6aa4",
    measurementId: "G-QLVQRV7KP7",
  };
  // console.log(process.env);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAuth(app);
};

export default initializeConfigue;





 