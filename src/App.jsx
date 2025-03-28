import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/colors.css';
import './Styles/index.css';
import './Styles/utilities.css';

import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
