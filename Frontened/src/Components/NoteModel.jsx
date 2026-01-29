import React from "react";
import { GiNotebook } from "react-icons/gi";
const NoteModel = ({ title,value,titleChange,contentChange,handleCreateNote }) => {
  return (
<>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input type="text" className="form-control" placeholder="Enter note title" value={value} onChange={titleChange} />
        <textarea className="form-control mt-3" rows="5" placeholder="Enter your note here..." value={value} onChange={contentChange} ></textarea>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={handleCreateNote} >Save changes</button>
      </div>
    </div>
  </div>
</div>
</>

  );
}
export default NoteModel;