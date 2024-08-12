import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Cartcontext from "./Context/Cartcontext";

export default function Profile() {
  const shopdata = useContext(Cartcontext);
  const {logout, userInfo} = shopdata;
 

 
  
  return (
    <div>
      

      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ marginTop: "50px", marginLeft: "20%", color:'black' }}
        >
          <div className="modal-dialog" style={{ maxWidth: "350px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ fontSize: "18px", textAlign:"start" }}>
                <div >
                  <b>Name :</b>
                  <span> {userInfo.name} </span>
                </div>
                <hr></hr>
                <div>
                  <b>Email :</b>
                  <span> {userInfo.email} </span>
                </div>
              </div>
              <div>
              <Link
                  className="btn btn-danger mt-1 mx-2 mb-2"
                  to="/login"
                  onClick={()=>{
                    logout();
                    }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
