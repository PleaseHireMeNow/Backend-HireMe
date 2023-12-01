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


import { getFirestore, connectFirestoreEmulator, collection, DocumentData} from "firebase/firestore";

// firebaseApps previously initialized using initializeApp()
export const db = getFirestore();
connectFirestoreEmulator(db, '127.0.0.1', 8080);


const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}


