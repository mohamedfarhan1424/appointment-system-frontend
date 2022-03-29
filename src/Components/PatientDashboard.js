import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function PatientDashboard() {
    const state=useSelector(state=>state);
    const navigate=useNavigate();
    if(state.isDoctor){
        navigate('/');
        return (
            <>
            <p>No access</p> <a href='/doctordashboard'>Doctor Dashboard</a>
            </>
        )
    }
    else if(!state.isAuthenticated){
        navigate('/');
        return (
            <>
            <p>Need to login</p><a href='/'>Login</a>
            </>
        )
    }
  return (
    <>
    <div className='dashboard'>
        <h3>Welcome {state.name}</h3>
    </div>
    <div>
        <h5>Available Doctors</h5>
    </div>
    </>
  )
}

export default PatientDashboard