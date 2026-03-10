import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"


import {
getTask,
getComments,
addComment,
deleteComment,
uploadFiles,
downloadFile,
deleteFile,
getFiles
} from "../api/api"

function TaskDetail(){

const { id } = useParams()

const [task,setTask] = useState(null)
const [comments,setComments] = useState([])
const [files,setFiles] = useState([])
const [newComment,setNewComment] = useState("")
const [selectedFiles,setSelectedFiles] = useState([])


// eslint-disable-next-line
useEffect(()=>{

loadTask()
loadComments()
loadFiles()

},[id])



const loadTask = async ()=>{

const res = await getTask(id)

setTask(res.data)

}



const loadComments = async () => {

const res = await getComments(id)

// console.log(res.data)

setComments(res.data)

}



const loadFiles = async ()=>{

const res = await getFiles(id)

setFiles(res.data)

}



const handleComment = async ()=>{

if(!newComment){
alert("Comment cannot be empty")
return
}

try{

await addComment(id,{
text:newComment
})

setNewComment("")

loadComments()

}
catch(err){

console.log(err.response?.data)

alert("Failed to add comment")

}

}



const handleDeleteComment = async (commentId) => {

try {

await deleteComment(commentId)

loadComments()

}
catch(err) {

console.log("DELETE ERROR:", err.response?.data)

alert("Failed to delete comment")

}

}



const handleFileChange = (e)=>{

setSelectedFiles(e.target.files)

}



const handleUpload = async ()=>{

if(selectedFiles.length === 0){
alert("Please select files")
return
}

try{

await uploadFiles(id,selectedFiles)

alert("Files uploaded")

loadFiles()

}
catch(err){

console.log(err.response?.data)

alert("Upload failed")

}

}



const handleDownload = async(fileId,filename)=>{

const res = await downloadFile(fileId)

const url = window.URL.createObjectURL(new Blob([res.data]))

const link = document.createElement("a")

link.href = url
link.setAttribute("download",filename)

document.body.appendChild(link)

link.click()

}



const handleDeleteFile = async(fileId)=>{

await deleteFile(fileId)

loadFiles()

}



if(!task) return <p>Loading...</p>



return(

<div>

<Navbar/>

<div className="container">

<h2>{task.title}</h2>

<p>{task.description}</p>

<p>Status : {task.status}</p>

<p>Priority : {task.priority}</p>



<h3>Comments</h3>

{comments.map((c)=>(
<div key={c.id} className="comment">

<p>{c.text}</p>

<button
onClick={()=>handleDeleteComment(c.id)}
>
Delete
</button>

</div>
))}



<textarea
placeholder="Add comment"
value={newComment}
onChange={(e)=>setNewComment(e.target.value)}
/>

<button onClick={handleComment}>
Add Comment
</button>



<h3>Files</h3>

<input
type="file"
multiple
onChange={handleFileChange}
/>

<button onClick={handleUpload}>
Upload Files
</button>



{files.map((file)=>(
<div key={file.id} className="file-item">

<span>{file.filename}</span>

<button
onClick={()=>handleDownload(file.id,file.filename)}
>
Download
</button>

<button
onClick={()=>handleDeleteFile(file.id)}
>
Delete
</button>

</div>
))}

</div>

</div>

)

}

export default TaskDetail

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import Navbar from "../components/Navbar"

// import {
// getTask,
// getComments,
// addComment,
// uploadFiles,
// downloadFile,
// deleteFile,
// getFiles
// } from "../api/api"

// function TaskDetail(){

// const { id } = useParams()

// const [task,setTask] = useState(null)
// const [comments,setComments] = useState([])
// const [files,setFiles] = useState([])
// const [newComment,setNewComment] = useState("")
// const [selectedFiles,setSelectedFiles] = useState([])



// useEffect(()=>{

// loadTask()
// loadComments()
// loadFiles()

// },[id])



// const loadTask = async ()=>{

// const res = await getTask(id)

// setTask(res.data)

// }



// const loadComments = async ()=>{

// const res = await getComments(id)

// setComments(res.data)

// }



// const loadFiles = async ()=>{

// const res = await getFiles(id)

// setFiles(res.data)

// }



// const handleComment = async ()=>{

// if(!newComment) return

// await addComment(id,{text:newComment})

// setNewComment("")

// loadComments()

// }



// const handleFileChange = (e)=>{

// setSelectedFiles(e.target.files)

// }



// const handleUpload = async ()=>{

// if(selectedFiles.length === 0){
// alert("Please select files")
// return
// }

// try{

// await uploadFiles(id, selectedFiles)

// alert("Files uploaded successfully")

// loadFiles()

// }
// catch(err){

// console.log(err.response?.data)

// alert("Upload failed")

// }

// }



// const handleDownload = async(fileId,filename)=>{

// const res = await downloadFile(fileId)

// const url = window.URL.createObjectURL(new Blob([res.data]))

// const link = document.createElement("a")

// link.href = url

// link.setAttribute("download", filename)

// document.body.appendChild(link)

// link.click()

// }



// const handleDeleteFile = async(fileId)=>{

// await deleteFile(fileId)

// loadFiles()

// }



// if(!task) return <p>Loading...</p>



// return(

// <div>

// <Navbar/>

// <div className="container">

// <h2>{task.title}</h2>

// <p>{task.description}</p>

// <p>Status : {task.status}</p>

// <p>Priority : {task.priority}</p>



// <h3>Comments</h3>

// {comments.map((c)=>(
// <div key={c.id} className="comment">
// <p>{c.text}</p>
// </div>
// ))}



// <textarea
// placeholder="Add comment"
// value={newComment}
// onChange={(e)=>setNewComment(e.target.value)}
// />

// <button onClick={handleComment}>
// Add Comment
// </button>



// <h3>Files</h3>

// <input
// type="file"
// multiple
// onChange={handleFileChange}
// />

// <button onClick={handleUpload}>
// Upload Files
// </button>



// {files.map((file)=>(
// <div key={file.id} className="file-item">

// <span>{file.filename}</span>

// <button onClick={()=>handleDownload(file.id,file.filename)}>
// Download
// </button>

// <button onClick={()=>handleDeleteFile(file.id)}>
// Delete
// </button>

// </div>
// ))}

// </div>

// </div>

// )

// }

// export default TaskDetail