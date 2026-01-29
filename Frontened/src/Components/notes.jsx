import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Notes = ({title,content,date,handleUpdateNote,handleDeleteNote}) => {

const [show,setShow]=React.useState(false);

const handleShow=()=>{
  setShow(!show);
}
    return (
      <div className="container-fluid">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
          {
            show && (
                  <div className="dropdown" style={{cursor:"pointer"}}>
             <FaEdit fontSize={20} cursor={"pointer"}  data-bs-toggle="modal" data-bs-target="#UpdateModal" onClick={handleUpdateNote} />
            <MdDelete fontSize={25} color="red" cursor={"pointer"} data-bs-toggle="modal" data-bs-target="#DeleteModal" onClick={handleUpdateNote} />
           </div>
            )
          }
          <div className="date text-start">
            <small className="text-muted">Created on:{date}</small>
       
           <BsThreeDotsVertical className="float-end mt-1" cursor="pointer" onClick={handleShow} />
          </div>
        
          </div>
        
        </div>
      </div>
    )
}

export default Notes