import firebase from 'firebase';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCp1IFDBBaqXGtgJNn677iBtLfmj41TSQI",
//     authDomain: "urbainfm-bd5e6.firebaseapp.com",
//     databaseURL: "https://urbainfm-bd5e6.firebaseio.com",
//     projectId: "urbainfm-bd5e6",
//     storageBucket: "urbainfm-bd5e6.appspot.com",
//     messagingSenderId: "272583848546",
//     appId: "1:272583848546:web:1364ad9acdc07b6196573b",
//     measurementId: "G-EGJ0NGRRG9"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyBqf9184Jz20XSGL811uhwXWhFIIb0ea4c",
    authDomain: "akilimali-2fb0e.firebaseapp.com",
    projectId: "akilimali-2fb0e",
    storageBucket: "akilimali-2fb0e.appspot.com",
    messagingSenderId: "680615516777",
    appId: "1:680615516777:web:217b31ee7acdc15e7220f8",
    measurementId: "G-6KRL3Q0GEY"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };