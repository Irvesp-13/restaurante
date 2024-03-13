import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAPW2Ig8f0g4i36sJHUh6YMJx9JQweBij0",
    authDomain: "restaurante5tob-785d9.firebaseapp.com",
    projectId: "restaurante5tob-785d9",
    storageBucket: "restaurante5tob-785d9.appspot.com",
    messagingSenderId: "1014546024221",
    appId: "1:1014546024221:web:af9171a6c9a5b5022543f4"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };