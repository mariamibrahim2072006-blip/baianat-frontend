// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvm7Vjyg9MctF5tHXOBz28jcLLBkbd8II",
    authDomain: "my-app-393a8.firebaseapp.com",
    projectId: "my-app-393a8",
    storageBucket: "my-app-393a8.firebasestorage.app",
    messagingSenderId: "328408672469",
    appId: "1:328408672469:web:61859ab449d9fbfc3e1a5c",
    measurementId: "G-GGY3C4FDFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// تصدير المصادقة وقاعدة البيانات لاستخدامها في الموقع
export const auth = getAuth(app);
export const db = getFirestore(app);