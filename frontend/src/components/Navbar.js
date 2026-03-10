import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="navbar">

      <div className="logo" class="nav-links">
        <Link to="/">Task Manager</Link>
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {token && <Link to="/dashboard/">Dashboard</Link>}
        {token && <Link to="/tasks/">Tasks</Link>}
        {token && <Link to="/analytics/">Analytics</Link>}

        {!token && <Link to="/login/">Login</Link>}
        {!token && <Link to="/register/">Register</Link>}

        {token && <button onClick={logout}>Logout</button>}

      </div>

    </div>
  )
}

export default Navbar