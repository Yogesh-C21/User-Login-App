import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Failure() {

    const location = useLocation();

    const {logErr} = location.state;
    const {signErr} = location.state; 
  return (
    <div>
      <div>Its a failure : {location.state.err}</div>
    <div>
      {logErr && <Link to='/'>Login</Link>}
      {signErr && <Link to='/api/signup'>Signup</Link>}
    </div>
    </div>
  )
}

export default Failure