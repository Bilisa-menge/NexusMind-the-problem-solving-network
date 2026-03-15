import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, enableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLWdQRbcSKJp8oRDotNgc4gFuGxoIWcGM",
  authDomain: "nexusmind-e2d8a.firebaseapp.com",
  projectId: "nexusmind-e2d8a",
  storageBucket: "nexusmind-e2d8a.firebasestorage.app",
  messagingSenderId: "481494377000",
  appId: "1:481494377000:web:e16da870009dae226e0b1d",
  measurementId: "G-KKYFVQ99BW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize auth persistence immediately and synchronously
// This must be set before any auth operations
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase auth persistence set successfully');
  })
  .catch((error) => {
    console.error('Failed to set auth persistence:', error);
  });

// Enable Firestore network access and handle offline cases
enableNetwork(db)
  .then(() => {
    console.log('Firestore network enabled successfully');
  })
  .catch((error) => {
    console.warn('Firestore network could not be enabled:', error);
  });

export { db, auth };
export default app;
