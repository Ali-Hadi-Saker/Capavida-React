import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/colors.css';
import './Styles/index.css';
import './Styles/utilities.css';

import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace';
import Help from './Pages/Help';
import Community from './Pages/Community';
import Internships from './Pages/Internships';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div>
      <BrowserRouter >
      <Navbar/>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
