import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgSVpkpYvhTJFgmOQPX4DvHuBRAJ3LJ0o",
    authDomain: "productnaruto-566bd.firebaseapp.com",
    projectId: "productnaruto-566bd",
    storageBucket: "productnaruto-566bd.firebasestorage.app",
    messagingSenderId: "441071253855",
    appId: "1:441071253855:web:fd705746534009a9e15eea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
