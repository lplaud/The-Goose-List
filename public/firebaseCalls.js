//<-----------------FIREBASE SETUP----------------------------->
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyC9M4mgEkyOjwTi4G_qmTA8ZZyXR3MtHko",
  authDomain: "goose-900f0.firebaseapp.com",
  databaseURL: "https://goose-900f0-default-rtdb.firebaseio.com",
  projectId: "goose-900f0",
  storageBucket: "goose-900f0.appspot.com",
  messagingSenderId: "347617989643",
  appId: "1:347617989643:web:84812b31a0a3408721230e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//<------------------------------------------------------------>

function newPost() {
  set(ref(db, 'List/Media'), {
    Name: "thisisatest",
    Type: "thisisatest2",
  });
}