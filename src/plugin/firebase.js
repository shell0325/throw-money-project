import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCDmVU7EyIt8ECjFFX6z79yhIu1dOJqQSI',
  authDomain: 'throw-money-867f1.firebaseapp.com',
  projectId: 'throw-money-867f1',
  storageBucket: 'throw-money-867f1.appspot.com',
  messagingSenderId: '514016979961',
  appId: '1:514016979961:web:2093b8814806d05e64eb28',
  measurementId: 'G-TT5X3HK9RB',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
