import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './pages/registration/components/register';
import ChattingInterface from './pages/registration/components/chat';
import VerifyOtp from './pages/registration/components/otpVerification';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/chat' Component={ChattingInterface}/>
          <Route path='/' element={<Register/>}/>
          <Route path='/verifyOtp' element={<VerifyOtp/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
