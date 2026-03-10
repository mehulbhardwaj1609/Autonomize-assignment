import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signup } from "../api/api"
import Navbar from "../components/Navbar"

function Register(){

const navigate = useNavigate()

const[name,setName] = useState("")
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")

const handleRegister = async(e) =>{

e.preventDefault()

try{

await signup({
name,
email,
password
})

alert("Registration successful")

navigate("/login")

}

catch(err){

alert("Registration failed")

}

}

return(

<div>

<Navbar/>

<div className="form-container">

<h2>Create Account</h2>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Register</button>

</form>

</div>

</div>

)

}

export default Register