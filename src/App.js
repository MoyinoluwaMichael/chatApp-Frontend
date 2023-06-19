import logo from './logo.svg';
import {
    Route
} from "react-router-dom"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './pages/registration/components/register';
import LoginUser from './pages/authentication/components/LoginUser';
import ChattingInterface from './pages/registration/components/chat';
import ErrorPage from './pages/registration/components/errorPage';
import ChattingInterface from './pages/chattingInterface/components/chattingInterface';
function App() {
  return (
    <div className="App">
          <Register/>
        <Route path= "/" element={<LoginUser/>} />
      <Router>
        <Routes>
          <Route path='*' Component={ErrorPage}/>
          <Route path='/dashboard' Component={ChattingInterface}/>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
