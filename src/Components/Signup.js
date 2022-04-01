import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [phoneno,setPhoneno]=useState('');
    const [check, setCheck] = useState(false);

    const [patientLogin,setPatientLogin]=useState(false);
  const [doctorLogin,setDoctorLogin]=useState(false);
  const [selected,setSelected]=useState(true);


    const [dname,setDName]=useState('');
    const [demail,setDEmail]=useState('');
    const [dusername,setDUsername]=useState('');
    const [dpassword,setDPassword]=useState('');
    const [dphoneno,setDPhoneno]=useState('');
    const [deducation,setDEducation]=useState('');
    const [dspeciality,setDSpeciality]=useState('');
    const [dcheck, setDCheck] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handlePatientSignup = (response) => {
        if (!response.usercreated) {
          setCheck(true);
        } else {
          setCheck(false);
          dispatch({
            type: "LOG_IN" ,
            payload: {
              name: name,
              email: email,
              username: username,
              isAuthenticated: true,
              phoneno: phoneno,
              accessToken:response.accessToken,
            },
          });
          navigate("/dashboard");
        }
      };

      const handleDoctorSignup = (response) => {
        if (!response.doctorcreated) {
          setDCheck(true);
        } else {
          setDCheck(false);
          dispatch({
            type: "LOG_IN_DOCTOR" ,
            payload: {
              name: dname,
              email: demail,
              username: dusername,
              isDoctor: true,
              phoneno: dphoneno,
              education:deducation,
              speciality:dspeciality,
              accessToken:response.accessToken,
            },
          });
          navigate("/dashboard");
        }
      };


    const handlePatientSubmit=event=>{
        event.preventDefault();
        const url = `${process.env.REACT_APP_API_ROUTE}/patientsignup`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name,email,username, password,phoneno })
    };
    fetch(url, requestOptions)
        .then(response =>response=response.json()).then((response)=>handlePatientSignup(response))
        .catch(error => console.log('Form submit error', error))
    }

    const handleDoctorSubmit=event=>{
      event.preventDefault();
      const url = `${process.env.REACT_APP_API_ROUTE}/doctorsignup`;
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dname,demail,dusername, dpassword,dphoneno,deducation,dspeciality })
  };
  fetch(url, requestOptions)
      .then(response =>response=response.json()).then((response)=>handleDoctorSignup(response))
      .catch(error => console.log('Form submit error', error))
  }
  return (
    <>
    <div className="centerdiv">
    {selected &&(
      <div className="logincarder">
        <Button size="large" variant="contained" onClick={()=>{setSelected(false);setPatientLogin(true);}}>Patient Register</Button><br/><br/>
        <Button size="large" variant="contained" onClick={()=>{setSelected(false);setDoctorLogin(true)}}>Doctor Register</Button>
      </div>)}
      {patientLogin && (
      <div className="carder">
        <h3>Patient Sign up!</h3><br/>
    <form method="post">
        <div className='forminput'>Patient Name: <input type="text" name="name" value={name} onChange={event=>setName(event.target.value)} required/></div><br/>
        <div className='forminput'>Patient Email: <input type="email" name="email" value={email} onChange={event=>setEmail(event.target.value)} required/></div><br/>
        <div className='forminput'>UserName: <input type="text" name="username" value={username} onChange={event=>setUsername(event.target.value)} required/></div><br/>
        <div className='forminput'>Password: <input type="password" name="password" value={password} onChange={event=>setPassword(event.target.value)} required/></div><br/>
        <div className='forminput'>Contact: <input type="text" name="phoneno" value={phoneno} onChange={event=>setPhoneno(event.target.value)} required/></div><br/>
        <button onClick={handlePatientSubmit} className="btn btn-primary">Sign Up</button><br/><br/>
    </form>

    {check && (
        <p style={{ color: "red" }}>
          There is already a user with this username.
        </p>
      )}
     <Button variant="text" onClick={()=>{setSelected(true);setPatientLogin(false);setCheck(false);setDCheck(false);}}>&larr; back</Button>

    </div>)}
    {doctorLogin && (
    <div className="carder">
        <h3>Doctor Sign up!</h3><br/>
    <form method="post">
    <div className='forminput'>Doctor Name: <input type="text" name="name" value={dname} onChange={event=>setDName(event.target.value)} required/></div><br/>
    <div className='forminput'>Doctor Email: <input type="email" name="email" value={demail} onChange={event=>setDEmail(event.target.value)} required/></div><br/>
    <div className='forminput'>UserName: <input type="text" name="username" value={dusername} onChange={event=>setDUsername(event.target.value)} required/></div><br/>
    <div className='forminput'>Password: <input type="password" name="password" value={dpassword} onChange={event=>setDPassword(event.target.value)} required/></div><br/>
    <div className='forminput'>Contact: <input type="text" name="phoneno" value={dphoneno} onChange={event=>setDPhoneno(event.target.value)} required/></div><br/>
    <div className='forminput'>Education: <input type="text" name="phoneno" value={deducation} onChange={event=>setDEducation(event.target.value)} required/></div><br/>
    <div className='forminput'>Speciality: <input type="text" name="phoneno" value={dspeciality} onChange={event=>setDSpeciality(event.target.value)} required/></div><br/>
        <button onClick={handleDoctorSubmit} className="btn btn-primary">Sign Up</button><br/><br/>
    </form>

    {dcheck && (
        <p className='errormsg'>
          There is already a doctor with this username.
        </p>
      )}
     <Button variant="text" onClick={()=>{setSelected(true);setDoctorLogin(false);setCheck(false);setDCheck(false);}}>&larr; back</Button>

    </div>)}


    </div>
    <br/>
    <div className='login'>
    <p>Having an Account?<a href='/'>Login</a></p>

    </div>

    </>
  )
}

export default Signup