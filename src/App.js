import './App.css';
import Login from './pages/login';
import TopPage from './pages/toppage';
import TodoForm from './pages/todo';
import Search from './pages/search';
import CheckedItem from './pages/checkeditem.tsx';
import InventoryUpdate from './pages/InventoryUpdate';
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
                    <Route path="/checked_item/" element= {<CheckedItem/>}/>
                    <Route path="/todo/" element= {<TodoForm/>}/>
                    <Route path="/search/" element= {<Search/>}/>
                    <Route path="/inventory_update/" element= {<InventoryUpdate/>}/>
                </Routes>
            </Router>
            </SelectedRowsProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
