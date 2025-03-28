import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Styles/App.css';
import Register from './Pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
