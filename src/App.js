import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Signup from './Components/Signup';

function App() {
  const dispatch=useDispatch();
  const state=useSelector(state=>state);
  return (
    <>
    <div className='head'>
      <h3>Appointment System</h3>
      {(state.isAuthenticated || state.isDoctor) && (<div>
        <button className='buttons' onClick={()=>dispatch({type:"LOG_OUT"})}>Log Out</button>
      </div>)}
    </div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
