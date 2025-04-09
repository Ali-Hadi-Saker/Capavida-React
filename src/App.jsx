import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/BrightnessContext';
import './Styles/colors.css';
import './Styles/index.css';
import './Styles/utilities.css';
import './Styles/theme.css';

import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace';
import Help from './Pages/Help';
import Community from './Pages/Community';
import Internships from './Pages/Internships';
import Navbar from './Components/Navbar';
import RoleSelection from './Pages/RoleSelection';
import InternshipCategories from './Pages/InternshipCategories';
import InternshipDashboard from './Pages/internshipDashboard';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = !['/register/Intern', '/register/Internship', '/register/Member', '/login', '/', '/internships'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<RoleSelection/>}/>
        <Route path='register/:role' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/help" element={<Help />} />
        <Route path="/categories" element={<InternshipCategories/>} />
        <Route path="/InternshipDash" element={<InternshipDashboard/>} />

      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
