import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { createTask } from "../api/api"

function CreateTask(){

const navigate = useNavigate()

const [title,setTitle] = useState("")
const [description,setDescription] = useState("")
const [status,setStatus] = useState("pending")
const [priority,setPriority] = useState("medium")
const [dueDate,setDueDate] = useState("")

const handleSubmit = async(e)=>{

e.preventDefault()

try{

await createTask({
title,
description,
status,
priority,
due_date: dueDate ? new Date(dueDate).toISOString() : null,
tags: [],
assigned_to: null
})

alert("Task created successfully")

navigate("/tasks/")

}

catch(err){
alert("Error creating task")
}

}

return(

<div>

<Navbar/>

<div className="form-container">

<h2>Create Task</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>
<option value="pending">Pending</option>
<option value="in_progress">In Progress</option>
<option value="completed">Completed</option>
</select>

<select
value={priority}
onChange={(e)=>setPriority(e.target.value)}
>
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>

<input
type="date"
value={dueDate}
onChange={(e)=>setDueDate(e.target.value)}
/>

<button type="submit">Create Task</button>

</form>

</div>

</div>

)

}

export default CreateTask