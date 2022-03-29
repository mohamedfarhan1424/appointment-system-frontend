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
              isAuthenticated: response.usercreated,
              phoneno: phoneno,
            },
          });
          navigate("/patientdashboard");
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
              isDoctor: response.doctorcreated,
              phoneno: dphoneno,
              education:deducation,
              speciality:dspeciality,
            },
          });
          navigate("/doctordashboard");
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
      <div className="carder">
        <h3>Patient Sign up!</h3><br/>
    <form method="post">
        Patient Name: <input type="text" name="name" value={name} onChange={event=>setName(event.target.value)} required/><br/><br/>
        Patient Email: <input type="email" name="email" value={email} onChange={event=>setEmail(event.target.value)} required/><br/><br/>
        UserName: <input type="text" name="username" value={username} onChange={event=>setUsername(event.target.value)} required/><br/><br/>
        Password: <input type="password" name="password" value={password} onChange={event=>setPassword(event.target.value)} required/><br/><br/>
        Phone Number: <input type="text" name="phoneno" value={phoneno} onChange={event=>setPhoneno(event.target.value)} required/><br/><br/>
        <button onClick={handlePatientSubmit} className="btn btn-primary">Sign Up</button><br/><br/>
    </form>

    {check && (
        <p style={{ color: "red" }}>
          There is already a user with this username.
        </p>
      )}

    </div>
    <div className="carder">
        <h3>Doctor Sign up!</h3><br/>
    <form method="post">
        Doctor Name: <input type="text" name="name" value={dname} onChange={event=>setDName(event.target.value)} required/><br/><br/>
        Doctor Email: <input type="email" name="email" value={demail} onChange={event=>setDEmail(event.target.value)} required/><br/><br/>
        UserName: <input type="text" name="username" value={dusername} onChange={event=>setDUsername(event.target.value)} required/><br/><br/>
        Password: <input type="password" name="password" value={dpassword} onChange={event=>setDPassword(event.target.value)} required/><br/><br/>
        Phone Number: <input type="text" name="phoneno" value={dphoneno} onChange={event=>setDPhoneno(event.target.value)} required/><br/><br/>
        Education: <input type="text" name="phoneno" value={deducation} onChange={event=>setDEducation(event.target.value)} required/><br/><br/>
        Speciality: <input type="text" name="phoneno" value={dspeciality} onChange={event=>setDSpeciality(event.target.value)} required/><br/><br/>
        <button onClick={handleDoctorSubmit} className="btn btn-primary">Sign Up</button><br/><br/>
    </form>

    {dcheck && (
        <p style={{ color: "red" }}>
          There is already a doctor with this username.
        </p>
      )}

    </div>


    </div>
    <p>Having an Account?<a href='/'>Login</a></p>

    </>
  )
}

export default Signup