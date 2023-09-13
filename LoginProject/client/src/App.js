// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Routes>
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Login />} />

        </Routes>

      </>
    </div>
  );
}

export default App;
