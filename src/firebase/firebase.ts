// Implement Firebase in react project and login and signup.

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { setReduxFullStateOnLoad } from "../store/reducer";
import store from "../store/store";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const appleProvider = new OAuthProvider("apple.com");
// Initialize Firebase Authentication and get a reference to the service
export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// Default setting it to LOCAL, Below are the options
//    firebase.auth.Auth.Persistence.LOCAL
//    firebase.auth.Auth.Persistence.SESSION
export const db = firebase.firestore();

export default firebase;

// sahoosrikant3601@gmail.com
// helloworld69
// srikant test account

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/v8/firebase.User
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export const firebaseSignInWithGoogle = async () => {
  try {
    const result = await firebase.auth().signInWithPopup(googleProvider);
    console.log("User signed in with Google!");
    return result.user;
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.message };
  }
};

// export const firebaseSignInWithApple = async () => {
//   try {
//     const result = await firebase.auth().signInWithRedirect(appleProvider);
//     console.log("User signed in with Apple!");
//     return result.user;
//   } catch (error) {
//     console.log(error.message);
//     return { error: true, message: error.message };
//   }
// };

export const firebaseLogOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log("User logged out!");
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.message };
  }
};

export const firebaseSignUp = async ({ email, password, name }) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({
      displayName: name,
    });
    console.log("User account created!");
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.message };
  }
};

export const firebaseLogIn = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("User logged in!");
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.message };
  }
};

export const loadState = (userId) => {
  const stateRef = doc(db, "states", userId);
  console.log({ stateRef });

  onSnapshot(stateRef, (stateSnap) => {
    if (stateSnap.exists()) {
      console.log({ stateSnap, data: stateSnap.data() });
      store.dispatch(setReduxFullStateOnLoad(stateSnap.data()));
    }
  });
};

// export const saveState = async (userId, state) => {
//   const stateRef = doc(db, "states", userId);
//   await setDoc(stateRef, { data: state });
// };

// export const SET_SETTING = "SET_SETTING";

// const { key, value } = setting;
// const data = {
//   [key]: value,
// };
export const saveStateInFireStore = () => async (dispatch, getState) => {
  const storeReduxData = store.getState().language;
  const userId = storeReduxData.profile.uid; // Replace this with the actual user ID
  console.log({ storeReduxData, userId });
  const stateRef = doc(db, "states", userId);
  console.log({ stateRef });
  const res = await setDoc(stateRef, storeReduxData, { merge: true });
  console.log({ res });
};

// dispatch({
//   type: SET_SETTING,
//   payload: setting,
// });

// Allow read/write access on all documents to any user signed in to the application
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
