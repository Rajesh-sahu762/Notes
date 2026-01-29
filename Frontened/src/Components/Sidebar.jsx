import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center mt-5 text-black">
        <h2 className="p-3 fw-bold fs-2">Notes</h2>
        </div>
        <div className="d-flex flex-column p-3 align-items-center sidebar-hover" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
    <FaPlusCircle className="fs-1" />
    <span className="ms-2 fw-bold">Add Note</span>
    </div>
 
    </div>
  );
}   
export default Sidebar;