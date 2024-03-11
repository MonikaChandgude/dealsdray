import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
     navigate('/login',{replace:true});

  }

  let location = useLocation();
  React.useEffect(() => {
    console.log( location.pathname);
  }, [location]);
  return (
    <div>
      

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <div className="mx-5">
  <Logo/>
  </div>
 
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="/home">Home</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/employee"> Employee</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/emplist">Employee List</Link>
        </li> */}
        
        
      
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
    {/* <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link> */}
      
    </form>:  <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
