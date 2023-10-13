import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Box} from '@mui/material'
import Feed from './components/Feed';
import Video from './components/Video';
import Channel from './components/Channel';
import Search from './components/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{backgroundColor : "#000"}}>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Feed/>}/>
          <Route path='/video/:id' element={<Video/>}/>
          <Route path='/channel/:id' element={<Channel/>}/>
          <Route path='/search/:searchTerm' element={<Search/>}/>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
