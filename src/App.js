import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
	const {currentUser} = useContext(AuthContext);

  	return (
		<Router>
			<Routes>
				<Route path='/' element={currentUser ? <Home/> : <Navigate to="/login"/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/register' element={<Register/>}/>
			</Routes>
		</Router>
  	);
}

export default App;
