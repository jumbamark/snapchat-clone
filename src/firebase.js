// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9pzEDyOM9tdPfxWku4Umv2QdtUJ2N9jA",
  authDomain: "snapchat-clone-3410e.firebaseapp.com",
  projectId: "snapchat-clone-3410e",
  storageBucket: "snapchat-clone-3410e.appspot.com",
  messagingSenderId: "653513074334",
  appId: "1:653513074334:web:675a3d227ff901ffce7d8f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// storage API on firebase, allows us to upload and share user generated content
const storage = getStorage(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, auth, provider, storage};
