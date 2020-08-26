import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import { firestore } from "firebase/";

var firebaseConfig = {
  apiKey: "AIzaSyBCXuGK14TDyDaufMMk54xzz5ROdi_ZfgQ",
  authDomain: "invoice-app-2708d.firebaseapp.com",
  databaseURL: "https://invoice-app-2708d.firebaseio.com",
  projectId: "invoice-app-2708d",
  storageBucket: "invoice-app-2708d.appspot.com",
  messagingSenderId: "654473354291",
  appId: "1:654473354291:web:b1ae8e096ad82cceb5d746",
  measurementId: "G-RYXVP10G91",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firestore(firebaseConfig);
export { db };
