import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './pages/registration/components/register';
import ChattingInterface from './pages/registration/components/chat';n

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/chat' Component={ChattingInterface}/>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
