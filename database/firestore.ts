import dotenv from 'dotenv';
import { Question } from '../types/models/Questions'
dotenv.config();

//Conection to firebase cloud

/*
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./key.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

*/

//============================================================================
// connection for firestore emulator

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurmentId: process.env.FIREBASE_MEASURMENTID,
};



import { getFirestore, connectFirestoreEmulator, collection, DocumentData, CollectionReference} from "firebase/firestore";
import { initializeApp } from 'firebase/app'
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
// connectFirestoreEmulator(db, '127.0.0.1', 8080);


const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}
// const createDocument = <T = DocumentData>(documentName: string) => {
//     return document( 
//
// }
//


export const questionsCol = createCollection<Question>('questions');

// export const questionDoc = 
