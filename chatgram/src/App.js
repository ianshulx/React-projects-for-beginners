import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import AddFreinds from './components/AddFreinds';
import Notificaionforauser from './components/Notificaionforauser';
import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import FetchAllUserState from './context/FetchAllUserState';
import Socketstate from './context/Socketstate';

function App() {
  return (
    <Socketstate>
      <Router>
      <Navbar/>
      <Routes>
      <Route exact path='/' element={<SignUp/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<SignUp/>}></Route>
        <Route exact path='/addfriends' element={<FetchAllUserState><AddFreinds/></FetchAllUserState>}></Route>
        <Route exact path="/chatpage" element = {<Chat></Chat>}></Route>
        <Route exact path="/notifications" element = {<Notificaionforauser></Notificaionforauser>}></Route>
      </Routes>
    </Router>
    </Socketstate>
  );
}

export default App;
