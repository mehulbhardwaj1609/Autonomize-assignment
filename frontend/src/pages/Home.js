import Navbar from "../components/Navbar"
import heroImage from "../assets/hero.jpg"

function Home(){

return(
<div>

<Navbar/>

<div className="container">

<h1>Task Management Platform</h1>

<p>
Organize, track and manage your tasks efficiently.
</p>

<img src={heroImage} alt="task management" className="hero-image"/>
</div>

</div>
)
}

export default Home