

import React from 'react'

const NavBar = ({showLoginHandler, showRegisterHandler, showLogout, logoutHandler}) => {
  const firmName=localStorage.getItem("firmName");
  return (
    <div className="navSection">
        <div className="company">
            <p>Vendor Dashboard</p>
        </div>
        <div className="firmName">
            <h4>Firm Name: {firmName}</h4>
        </div>
        <div className="userAuth">
            {!showLogout?<>
                <button onClick={showLoginHandler}>Login</button>
                <button onClick={showRegisterHandler}>Register</button>
            </> : <button onClick={logoutHandler}>Logout</button>}
            
        </div>
    </div>
  )
}

export default NavBar













