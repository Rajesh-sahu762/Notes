import React from "react";


export const DeleteNote = ({ handleDelete }) => {
  return (
    <>
    <div className="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Delete Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        Are you sure you want to delete this note?
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete} >Delete</button>
        </div>
    </div>
    </div>
</div>

    </>
  )
}