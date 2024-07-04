// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBlLj9wp_dXXtJqQ_qO49lexIW3whInM_E",
//   authDomain: "backtest2-40cd4.firebaseapp.com",
//   projectId: "backtest2-40cd4",
//   storageBucket: "backtest2-40cd4.appspot.com",
//   messagingSenderId: "411618028585",
//   appId: "1:411618028585:web:e78a7d6b14c92958084038",
//   measurementId: "G-W0D253G80T"

//   // ของผม
//   // apiKey: "AIzaSyAhNnV6q8AVDytb_EoNs3Mh1-TZRGIvF50",
//   // authDomain: "backtesting-ab7f5.firebaseapp.com",
//   // projectId: "backtesting-ab7f5",
//   // storageBucket: "backtesting-ab7f5.appspot.com",
//   // messagingSenderId: "822999040736",
//   // appId: "1:822999040736:web:ca517e369053e3b5080685",
//   // measurementId: "G-QEYLDFX37M"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBlLj9wp_dXXtJqQ_qO49lexIW3whInM_E",
  authDomain: "backtest2-40cd4.firebaseapp.com",
  projectId: "backtest2-40cd4",
  storageBucket: "backtest2-40cd4.appspot.com",
  messagingSenderId: "411618028585",
  appId: "1:411618028585:web:e78a7d6b14c92958084038",
  measurementId: "G-W0D253G80T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
