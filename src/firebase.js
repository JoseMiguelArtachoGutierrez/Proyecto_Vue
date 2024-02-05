import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDybO4Rr37NUipc5kWM2yAReLqWlCSYzuI",
  authDomain: "todolist-69583.firebaseapp.com",
  projectId: "todolist-69583",
  storageBucket: "todolist-69583.appspot.com",
  messagingSenderId: "147302930963",
  appId: "1:147302930963:web:0ddf017fda680464133de6",
  measurementId: "G-EY1YP1XCMV"
  })

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')