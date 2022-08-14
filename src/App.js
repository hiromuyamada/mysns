import logo from './logo.svg';
import './App.css';
import { Header } from './components/modules/Header';
import { Router } from './components/Router';
import { initializeApp } from "firebase/app";

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


function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
