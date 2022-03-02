import './App.css';
import './bootstrap/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Router>
      <div className="App">
            <Nav/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/dashboard' exact element={<Dashboard/>}/>
            {/* <Route path='/shop/:id' element={<ItemDetail/>}/> */}
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
