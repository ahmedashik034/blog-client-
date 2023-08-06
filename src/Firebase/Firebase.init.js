import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const initializeConfigue = () => {
    
    const firebaseConfig = {
        apiKey: "AIzaSyCboOljv5j_j2m2Gpy3v1KDL1iqHo6hduk",
        authDomain:"doctalk-medical.firebaseapp.com",
        projectId: "doctalk-medical",
        storageBucket: "doctalk-medical.appspot.com",
        messagingSenderId:"142017913339",
        appId: "1:142017913339:web:74f3ea822be4ca0a4b6b5e",
        measurementId: "G-YZL2DSHT3R",


        // apiKey: process.env.REACT_APP_API_KEY,
        // authDomain:process.env.REACT_APP_AUTH_DOMAIN,
        // projectId: process.env.REACT_APP_PROJECT_ID,
        // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        // messagingSenderId:process.env.REACT_APP_MESSEGING_SENDER_ID,
        // appId: process.env.REACT_APP_APP_ID,
        // measurementId: process.env.REACT_APP_MEASUREMENT_ID,

        
    };
    // console.log(process.env);
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    getAuth(app);
};

export default initializeConfigue;