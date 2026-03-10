import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {login} from "../api/api"
import Navbar from "../components/Navbar"

function Login(){

const navigate = useNavigate()

const[email,setEmail] = useState("")
const[password,setPassword] = useState("")

const handleLogin = async(e)=>{

e.preventDefault()

try{

const res = await login({email,password})

localStorage.setItem("token",res.data.access_token)

navigate("/dashboard")

}
catch(err){
alert("Login failed, username or password is incorrect")
}

}

return(

<div>

<Navbar/>

<div className="form-container">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit">Login</button>

</form>

</div>

</div>

)
}

export default Login