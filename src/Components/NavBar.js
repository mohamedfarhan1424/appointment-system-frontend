import { AccountBox, CalendarMonth, Dashboard, Logout } from '@mui/icons-material';
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import '../App.css'

function NavBar({show,setShow,setRot}) {

 

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [current,setCurrent]=useState("dashboard");
   

  return (
    <>
    
      
          <>
          <div className={show?'sidebar active':'sidebar'}>
             
            <button onClick={()=>{setShow(false);setRot(c=>!c);navigate('/dashboard');setCurrent("dashboard")}} className={current==="dashboard"?'sidebarbutton':'sidebarbuttonselect'}><div className='d-flex justify-content-start p-2'><Dashboard/> DashBoard</div></button>

            <button onClick={()=>{setShow(false);setRot(c=>!c);navigate('/profile');setCurrent("profile")}} className={current==="profile"?'sidebarbutton':'sidebarbuttonselect'}><div className='d-flex justify-content-start p-2'><AccountBox/> Profile</div></button>
            <button onClick={()=>{setShow(false);setRot(c=>!c);navigate('/appointments');setCurrent("appoint")}} className={current==="appoint"?'sidebarbutton':'sidebarbuttonselect'}><div className='d-flex justify-content-start p-2'><CalendarMonth/> Appointments</div></button>

            <button onClick={()=>{setShow(false);setRot(c=>!c);dispatch({type:"LOG_OUT"});setCurrent("dashboard")}} className='sidebarbuttonselect'><div className='d-flex justify-content-start p-2'><Logout/> Log Out</div></button>



            
        
         </div>
          </>
      
          
      
          
   
    </>
  )
}

export default NavBar