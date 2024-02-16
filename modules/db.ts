import dotenv from 'dotenv';
dotenv.config();


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurmentId: process.env.FIREBASE_MEASURMENTID,
};

import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app'
const app = initializeApp(firebaseConfig);

const db = getFirestore();

import * as admin from "firebase-admin"

import serviceAccount from "../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ! eventuall want to move all routes over to admin instead of db 🙃
export {admin, db};