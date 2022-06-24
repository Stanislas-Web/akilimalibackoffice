import firebase from 'firebase/app';
import 'firebase/storage';


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