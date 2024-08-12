import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
<div className="text-light" style={{backgroundColor:"black"}}>
  <footer className="py-3 mt-5 text-light" >
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item" style={{color:"white"}}><Link to="/" className="nav-link px-2 text-light">Home</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-light">Features</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-light">Pricing</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-light">FAQs</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-light">About</Link></li>
    </ul>
    <p className="text-center">© 2024 Company, Inc</p>
  </footer>
</div>
    </div>
  )
}
