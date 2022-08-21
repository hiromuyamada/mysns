import './App.css';
import { Header } from './components/modules/Header';
import { Router } from './components/Router';
import firebase from 'firebase';
import { firebaseConfig } from './env';

require('firebase/firestore');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
