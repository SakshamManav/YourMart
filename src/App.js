import Martitems from "./components/Martitems";
import Cartstate from "./components/Context/Cartstate";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cartitems from "./components/Cartitems";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import Profile from "./components/Profile";

function App() {
  useEffect(()=>{
    document.body.style.backgroundColor="#042743";
    })
  return (
    <>
      <Router>
        <Cartstate>
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<Martitems /> } />
              <Route path="/cart" element={<Cartitems />} />
              <Route path="/login" element= {<Login/>}/>
              <Route path="/signup" element={ <Signup/> }/>
            </Routes>
          </div>
        </Cartstate>
      </Router>
    </>
  );
}

export default App;
