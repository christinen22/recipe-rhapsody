import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { collection, DocumentData, CollectionReference } from "firebase/firestore"



const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Auth instance
export const auth = getAuth(app)

// Get Firestore instance
export const db = getFirestore(app)

// DB collection response
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}


export default app
