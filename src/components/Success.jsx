import React from 'react'
import { useLocation } from 'react-router-dom'

function Success() {

    const location = useLocation();
    const userData = location.state.data;
    const {username, desc} = userData;
  return (
    <div>Hello {username},<br />
    Your secret info is <br />
    {desc ? desc: "empty"}</div>
  )
}

export default Success