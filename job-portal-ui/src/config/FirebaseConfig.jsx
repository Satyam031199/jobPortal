import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbaAaWNv-NeeI7v0NGJzFqHMyWZAHB8VE",
  authDomain: "jobs-portal-2791c.firebaseapp.com",
  projectId: "jobs-portal-2791c",
  storageBucket: "jobs-portal-2791c.appspot.com",
  messagingSenderId: "632532730448",
  appId: "1:632532730448:web:8867b6c5ac28569ce44755"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();