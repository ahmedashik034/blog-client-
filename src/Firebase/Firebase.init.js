import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const initializeConfigue = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCUInuaseVmSjthpIVOsX9n8jhQTS0rgWU",
        authDomain: "blog-management-e9411.firebaseapp.com",
        projectId: "blog-management-e9411",
        storageBucket: "blog-management-e9411.appspot.com",
        messagingSenderId: "798070885271",
        appId: "1:798070885271:web:4237e9378c0c3aab77d2d2",
        measurementId: "G-H6R7JWZL5V"
      };
  // console.log(process.env);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAuth(app);
};

export default initializeConfigue;





 