import './App.css';
import Login from './pages/login';
import TopPage from './pages/toppage';
import { AuthProvider } from './context/authcontext';
import { SelectedRowsProvider } from './context/selectcontext';
import Header from './pages/header';
import { BrowserRouter as Router, Routes ,Route, useNavigate } from "react-router-dom";
import UnderOrderPoint from './pages/underorderpoint.tsx';


function App() {
  return (
    <div className="App">
        <AuthProvider>
          <SelectedRowsProvider>
            <Router>
                <Routes>
                    <Route path="/" element= {<Login/>}/>
                    <Route path="/admin/" element= {<TopPage/>}/>
                    <Route path="/under_orderpoint/" element= {<UnderOrderPoint/>}/>
                </Routes>
            </Router>
            </SelectedRowsProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
