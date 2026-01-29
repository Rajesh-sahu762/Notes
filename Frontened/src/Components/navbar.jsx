import React, { use } from "react";
import { post } from "../../Services/ApiEndPoint";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {


  const navigate =useNavigate();

  const handleLogout = async () => {
    try {
    const request = await post('/Auth/logout');
    const res = request.data;
    if (res?.message) {
      toast.success(res.message); 
      navigate('/login');
    }
  } catch (error) {
  
    console.log('Error logging out:', error);
    if (error?.response) {
      const serverMsg = error?.response?.data?.message || error.message;
      toast.error(serverMsg);
    }
  }

}
    return (   
      <nav className="navbar mt-3">
        <div className="container-fluid">
            <input type="search" className="searchInput" placeholder="Search..."  />
            <button type="text" className="btn bg-dark text-white mx-3" onClick={handleLogout}  >Logout</button>

        </div>
      </nav>
    );
}

export default Navbar;