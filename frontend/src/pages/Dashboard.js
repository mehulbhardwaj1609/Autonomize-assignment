import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getTasks } from "../api/api"

function Dashboard(){

const[tasks,setTasks] = useState([])

useEffect(()=>{

async function load(){

const res = await getTasks()

setTasks(res.data)

}

load()

},[])

const total = tasks.length
const completed = tasks.filter(t=>t.status==="completed").length
const pending = tasks.filter(t=>t.status==="pending").length

return(

<div>

<Navbar/>

<div className="container">

<h2>Dashboard</h2>

<div className="stats">

<div className="card">
<h3>Total Tasks</h3>
<p>{total}</p>
</div>

<div className="card">
<h3>Completed</h3>
<p>{completed}</p>
</div>

<div className="card">
<h3>Pending</h3>
<p>{pending}</p>
</div>

</div>

</div>

</div>

)

}

export default Dashboard