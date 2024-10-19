import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKM8E62mC0Ww4K8QwpNdwtyBB_bRaNVaY",
    authDomain: "week7-tanran-liu.firebaseapp.com",
    projectId: "week7-tanran-liu",
    storageBucket: "week7-tanran-liu.appspot.com",
    messagingSenderId: "858298378773",
    appId: "1:858298378773:web:07b08014487c8334c6bc1c"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  const dp = getFirestore();
  export default dp;