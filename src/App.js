import './App.css';
import { Header } from './components/modules/Header';
import { Router } from './components/Router';
import firebase from 'firebase';
import { firebaseConfig } from './env';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
