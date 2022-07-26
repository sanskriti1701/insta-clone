import firebase from 'firebase/compat';

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyB4jcjOs_7RrZGkQeELfYIUY-oIMa0udrE",
    authDomain: "instagram-clone-react-76f59.firebaseapp.com",
    projectId: "instagram-clone-react-76f59",
    storageBucket: "instagram-clone-react-76f59.appspot.com",
    messagingSenderId: "1090549719551",
    appId: "1:1090549719551:web:27c350d84a79c15a5447ca"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };