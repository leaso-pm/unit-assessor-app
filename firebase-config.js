// firebase-config.js
// We use full URLs (CDN) here so this works in the browser without a build step
import { initializeApp } from "[https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js](https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js)";
import { getFirestore, collection, addDoc, query, where, onSnapshot, updateDoc, doc, orderBy } from "[https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js](https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js)";
import { getAuth, signInAnonymously } from "[https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js](https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js)";

// Your verified keys for "leaso-apps"
const firebaseConfig = {
  apiKey: "AIzaSyCz7bxLKrbUZv9BKjmwWReWyWU6qAKtIyI",
  authDomain: "leaso-apps.firebaseapp.com",
  projectId: "leaso-apps",
  storageBucket: "leaso-apps.firebasestorage.app",
  messagingSenderId: "3765608340",
  appId: "1:3765608340:web:b49a948b37e24bbf03b981",
  measurementId: "G-MQYRYZMRE1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Authenticate silently so the app can talk to the database
signInAnonymously(auth).catch((error) => {
    console.error("Auth Error:", error);
});

export { db, auth, collection, addDoc, query, where, onSnapshot, updateDoc, doc, orderBy };
