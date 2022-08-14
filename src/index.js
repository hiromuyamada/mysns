import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from './components/Router';
import { makeStyles,createStyles } from '@mui/material';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Header } from './components/modules/Header';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwkLeXuScZk3u7GY6ZkpdoMQUN47Ko9fU",
  authDomain: "mysns-6b31e.firebaseapp.com",
  projectId: "mysns-6b31e",
  storageBucket: "mysns-6b31e.appspot.com",
  messagingSenderId: "601522775758",
  appId: "1:601522775758:web:89b44f1c970baed95ed29f"
};

// Initialize Firebase

    const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
