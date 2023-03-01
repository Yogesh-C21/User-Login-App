import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Failure from './components/Failure';
import Success from './components/Success';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/api/signup' element={<Signup />} />
          <Route path='/api/failure' element={<Failure />} />
          <Route path='/api/success' element={<Success />} />
          <Route path='/api/exist' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
