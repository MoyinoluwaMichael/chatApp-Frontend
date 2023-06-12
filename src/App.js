import logo from './logo.svg';
import {
    Route
} from "react-router-dom"
import './App.css';
import Register from './pages/registration/components/register';
import LoginUser from './pages/authentication/components/LoginUser';

function App() {
  return (
    <div className="App">
          <Register/>
        <Route path= "/" element={<LoginUser/>} />
    </div>
  );
}

export default App;
