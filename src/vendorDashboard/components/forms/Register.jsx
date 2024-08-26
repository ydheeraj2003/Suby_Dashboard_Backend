import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await fetch(`${API_URL}/vendor/register`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username,email,password})
        })
        const data=await response.json();
        if (response.ok){
            console.log(data);
            setUsername("");
            setEmail("");
            setPassword("");
            alert("registered successfully");
            showLoginHandler();
        }
    }
    catch(error){
        console.log("registration failed", error);
        alert("registration failed");
    }
  }
  return (
    <div className="registerSection">
        <form className="authForm" onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>Username</label>
            <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="enter your username"/><br/>
            <label>Email</label>
            <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter your email"/><br/>
            <label>Password</label>
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter your password"/><br/>
            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>
        </form>
        
    </div>
  )
}

export default Register