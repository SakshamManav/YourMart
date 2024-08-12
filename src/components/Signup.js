import React, { useContext,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cartcontext from "./Context/Cartcontext";
import Alert from "./Alert";

export default function Signup() {
  const shopData = useContext(Cartcontext);
  const {   alertMsg, setAlertMsg ,showAlert, setShowAlert} = shopData;
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  function runAlert(){
    setShowAlert(true);
    setTimeout(()=>{
      setShowAlert(false);
    }, 1000)
  }
  


  function handleChange(e) {
    e.preventDefault();
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  }

  async function createUser(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/shop/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        }),
      });

      let respo = await response.json();
      if (response.ok) {
        navigate("/");
        localStorage.setItem("authToken", respo.authtoken);
      } else {
        if(respo.msg){
          for (let obj of respo.msg) {
            setAlertMsg({msg:obj.msg, type:"danger"});
          }
          runAlert();
        }
        else{
          setAlertMsg({msg:respo.err, type:"danger"});
          runAlert();
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
   {showAlert && <Alert message={alertMsg.msg} type={alertMsg.type} />}
    <div className="container d-flex justify-content-center align-center">
      <div
        className=""
        style={{
          minWidth: "350px",
          minHeight: "450px",
          marginTop: "80px",
          border: "2px solid black",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1 className="text-center text-warning">Create your account</h1>
        <form className="mt-4" onSubmit={createUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text text-danger">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div id="emailHelp" className="form-text text-light">
          If have a account, please <Link to="/login">Login</Link>{" "}
        </div>
      </div>
    </div>
    </>
  );
}
