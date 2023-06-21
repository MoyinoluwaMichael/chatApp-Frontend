import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './pages/registration/components/register';
import LoginUser from './pages/authentication/components/LoginUser';
import ErrorPage from './pages/registration/components/errorPage';
import ChattingInterface from './pages/chattingInterface/components/chattingInterface';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' Component={ErrorPage}/>
          <Route path='/authenticate' Component={LoginUser}/>
          <Route path='/dashboard' Component={ChattingInterface}/>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
