import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
    const state=useSelector(state=>state);
    const navigate=useNavigate();
    if(!state.isDoctor){
        navigate('/');
        return (
            <>
            <p>Need to login</p> <a href='/'>login</a>
            </>
        )
    }
  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard