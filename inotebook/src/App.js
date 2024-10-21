import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotesSection  from './components/NotesSection';
import RecycleBin from './components/RecycleBin';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message,type) => {
    setalert({
      message : message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 3000);
  }
  return (
    <NoteState>
          <Router>
            <div>
              <Navbar></Navbar>
              <Alert alert = {alert}/>
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
                  <Route exact path="/about" element={<About/>}></Route>
                  <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>}></Route>
                  <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
                  <Route exact path="/dashBoard" element={<Dashboard/>}></Route>
                  <Route exact path="/notesSection" element={<NotesSection showAlert={showAlert}/>}></Route>
                  <Route exact path="/recyclebin" element={<RecycleBin/>}></Route>
                </Routes>
              </div>
            </div>
        </Router>
    </NoteState>
  );
}

export default App;
