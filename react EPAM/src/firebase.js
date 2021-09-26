import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA4fUk0UikDlIPsbEZd5_YmBvvXEn84NOk",
  authDomain: "netflix-3bbd6.firebaseapp.com",
  databaseURL: "https://netflix-3bbd6-default-rtdb.firebaseio.com",
  projectId: "netflix-3bbd6",
  storageBucket: "netflix-3bbd6.appspot.com",
  messagingSenderId: "441992551282",
  appId: "1:441992551282:web:b29ad87d6fcaabdbda9beb",
  measurementId: "G-JMX4NFXGH8"
};
 
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const dataBase = firebaseApp.database();

export {auth , dataBase};
export default db;
  