// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_klv1YEgwikkv0NNNj-RWO-eVo8lMu3c",
    authDomain: "uploadingfile-a87d9.firebaseapp.com",
    projectId: "uploadingfile-a87d9",
    storageBucket: "uploadingfile-a87d9.appspot.com",
    messagingSenderId: "601083883330",
    appId: "1:601083883330:web:ee61f7803ee02fcdc062db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)