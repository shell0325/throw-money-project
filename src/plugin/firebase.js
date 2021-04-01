import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config'

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
