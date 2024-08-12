import React ,{useContext, useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cartcontext from './Context/Cartcontext';
import Alert from './Alert';

export default function Login() {
  const shopData = useContext(Cartcontext);
  const{ alertMsg, setAlertMsg ,showAlert, setShowAlert} = shopData;
  const navigate = useNavigate();
  const [userInfo, setUserInfo]= useState({
    email:"",
    password:"",
  })
  
  function handleChange(e){
    e.preventDefault();
    setUserInfo({...userInfo, [e.target.id] : e.target.value})
  }
  function runAlert(){
    setShowAlert(true);
    setTimeout(()=>{
      setShowAlert(false);
    }, 1000)
  }
  
    async function loginUser(e) {
      e.preventDefault();
      try{
        let response = await fetch("http://localhost:3000/shop/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            email:userInfo.email,
            password:userInfo.password,
          })
        });
        
        let respo = await response.json();
        console.log(respo);
        if(response.ok){
          navigate("/");
          localStorage.setItem("authToken",respo.authToken);
        }
        else{
          console.log(respo);
          setAlertMsg({msg:respo.err, type:"danger"});
          runAlert();
        }
      }
      catch(error){
        console.log(error);
      }
    }
   
    
  return (
    <>
    {showAlert && <Alert message={alertMsg.msg} type={alertMsg.type} />}
    <div className='container d-flex justify-content-center align-center'  >
    
   <div className='' style={{maxWidth:"450px" ,minWidth:"350px",minHeight:"400px", marginTop:"80px", border:"2px solid black", padding:"20px", borderRadius:"20px",backgroundColor:"black", color:"white" }}>
   <h1 className='text-center text-warning' >Sign in to your account</h1>
   <form className='mt-4' onSubmit={loginUser}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={handleChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text text-danger">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} name='password'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    <div id="emailHelp" className="form-text text-light">don't have a account, please <Link to="/signup">Signup</Link> </div>
   </div>
    </div>
    </>
  )
}
