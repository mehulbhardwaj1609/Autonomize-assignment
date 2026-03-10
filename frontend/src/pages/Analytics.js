import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

import {
getTaskOverview,
getTaskStatus,
getUserPerformance,
getTaskTrends,
exportTasks
} from "../api/api"

function Analytics(){

const [overview,setOverview] = useState(null)
const [status,setStatus] = useState([])
const [performance,setPerformance] = useState([])
const [trends,setTrends] = useState([])

useEffect(()=>{

loadOverview()
loadStatus()
loadPerformance()
loadTrends()

},[])


const loadOverview = async ()=>{
try{
const res = await getTaskOverview()
setOverview(res.data)
}catch(err){
console.error(err)
}
}


const loadStatus = async ()=>{
const res = await getTaskStatus()
setStatus(res.data)
}


const loadPerformance = async ()=>{
const res = await getUserPerformance()
setPerformance(res.data)
}


const loadTrends = async ()=>{
const res = await getTaskTrends()
setTrends(res.data)
}


const handleExport = async ()=>{

const res = await exportTasks()

const url = window.URL.createObjectURL(new Blob([res.data]))

const link = document.createElement("a")

link.href = url
link.setAttribute("download","tasks.csv")

document.body.appendChild(link)

link.click()

}


return(

<div>

<Navbar/>

<div className="container">

<h2>Analytics</h2>

<button onClick={handleExport}>
Export Tasks CSV
</button>


<h3>Task Overview</h3>

{overview && (
<div>

<h4>Status Counts</h4>
{overview.status_counts?.map((s,i)=>(
<p key={i}>{s.status} : {s.count}</p>
))}

<h4>Priority Counts</h4>
{overview.priority_counts?.map((p,i)=>(
<p key={i}>{p.priority} : {p.count}</p>
))}

</div>
)}


<h3>Task Status</h3>

{status.map((s,i)=>(
<p key={i}>{s.status} : {s.count}</p>
))}


<h3>User Performance</h3>

{performance.map((u,i)=>(
<p key={i}>{u.user} completed {u.completed_tasks} tasks</p>
))}


<h3>Task Trends</h3>

{trends.map((t,i)=>(
<p key={i}>{t.date} : {t.tasks} tasks</p>
))}

</div>

</div>

)

}

export default Analytics