import React, {useState} from 'react'
import './style.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const submitHandler = async function(event) {
      event.preventDefault();
      try {
        const resp = await Axios.post('http://localhost:8080/api/signup', {username, password, description});
        console.log(resp);
        if(resp.data === 'sww_user_already_exist') {
          navigate('/api/failure', {state: {err: "The User Already Exists", signErr: true}})
        } else {
          navigate('/api/success', {state: {data: resp.data}});
        }
      } catch(e) {
        console.log(e);
      }
    }

  return (
    <form onSubmit={submitHandler} className="formContainer" autoComplete="off">
        <label>Username: </label>
        <input type="text" name="username" value = {username} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} required/>
        <label>Password: </label>
        <input type="password" name="password" value = {password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
        <label>Secret Info: </label>
        <input type="text" name="description" value = {description} placeholder="Password" onChange={(e) => {setDescription(e.target.value)}} required/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Signup