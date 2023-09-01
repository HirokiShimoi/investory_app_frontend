import './App.css';
import Login from './pages/login';
import TopPage from './pages/toppage';
import { AuthProvider } from './context/authcontext';
import Header from './pages/header';
import { BrowserRouter as Router, Routes ,Route, useNavigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element= {<Login/>}/>
                    <Route path="/admin/" element= {<TopPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
