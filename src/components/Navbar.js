import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Cartcontext from "./Context/Cartcontext";
import "./Navbar.css"; 
import Profile from "./Profile";

export default function Navbar() {
  const { cartProducts, fetchUser } = useContext(Cartcontext);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./Untitled design.png"
              alt="Logo"
              width="35"
              height="34"
              className="d-inline-block align-text-top"
              style={{ borderRadius: "50%" }}
            />
            <span className="ms-2 brand-name">YourMart</span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {((!localStorage.getItem("authToken") &&
              location.pathname !== "/login") ||
              location.pathname === "/signup") && (
              <li className="nav-item">
                <Link className="btn btn-success mt-1 mx-2" to="/login">
                  Login
                </Link>
              </li>
            )}
            {location.pathname === "/" && localStorage.getItem("authToken") && (
              <li className="nav-item">
                <button
                  className="btn btn-primary mt-1 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    fetchUser();
                  }}
                >
                  <i className="fa-solid fa-user"></i>
                  <Profile />
                </button>
              </li>
            )}
       
            {location.pathname === "/login" && (
              <li className="nav-item">
                <Link className="btn btn-success mt-1 mx-2" to="/signup">
                  signup
                </Link>
              </li>
            )}

            {location.pathname !== "/" && (
              <li className="nav-item">
                <Link className="nav-link cart-link" to="/">
                  <div className="cart-icon-container">
                    <i className="fa-solid fa-house home-icon"></i>
                  </div>
                </Link>
              </li>
            )}
            {location.pathname !== "/login" &&
              location.pathname !== "/signup" && (
                <li className="nav-item">
                  <Link className="nav-link cart-link" to="/cart">
                    <div className="cart-icon-container mx-2">
                      <i className="fa-solid fa-cart-shopping cart-icon"></i>
                      {cartProducts.length > 0 && (
                        <span className="cart-count">
                          {cartProducts.length}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
