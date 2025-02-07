import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDTUFSwqboVruE1tWvvNsWbzvkY-_Y63ec",
    authDomain: "projeto-2dff1.firebaseapp.com",
    projectId: "projeto-2dff1",
    storageBucket: "projeto-2dff1.firebasestorage.app",
    messagingSenderId: "356913748765",
    appId: "1:356913748765:web:97a94fb2abcbca211c9ff4",
    measurementId: "G-2H0148L8WZ"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseapp);
  const auth = getAuth(firebaseapp);

  export { db, auth };