import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate =  useNavigate();

    const submitHandler = async function(event) {
        event.preventDefault();
        try {
        const resp = await Axios.post('http://localhost:8080/api/login', {username, password});
        console.log(resp);
        if(resp.data === 'sww_not_found') {
          navigate('/api/failure', {state: {err: "The User Does not Exists", logErr: true}});
        }else if(resp.data === 'sww_wrong_pwd') {
          navigate('/api/failure', {state: {err: "Wrong Passwrod", logErr: true}});
        } else {
          navigate('/api/success', {state: {data: resp.data}});
        }
      } catch(e) {
        console.log(e);
      }
    }


  return (
    <div className="formContainer">
        <form onSubmit={submitHandler}autoComplete="off">
        <label>Username: </label>
        <input type="text" name="username" value = {username} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} required/>
        <label>Password: </label>
        <input type="password" name="password" value = {password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
        <button type="submit">Submit</button>
    </form>

    <h2>Don't have account?</h2>
    <Link to = '/api/signup'>Signup</Link>
    </div>
  )
}

export default Login