import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/navbar'
import Notes from '../Components/notes'
import NoteModel from '../Components/NoteModel'
import { del, get, post, put } from '../../Services/ApiEndPoint'
import toast from 'react-hot-toast';
import UpdateNote from '../Components/Updatenote'
import { DeleteNote } from '../Components/Deletenote'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [refresh, setRefresh] = useState(false);

  // Separate state for update form
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [noteId, setNoteId] = useState("");

  const titleChange = (e) => setTitle(e.target.value);
  const contentChange = (e) => setContent(e.target.value);

  const handleCreateNote = async () => {
    try {
      const request = await post('/Note/CreateNote', { title, content });
      const res = request.data;
      if (res?.message) {
        toast.success(res.message);
        setRefresh((v) => !v);
      }
    } catch (error) {
      const serverMsg = error?.response?.data?.message || error.message;
      toast.error(serverMsg || 'Create failed');
    }
  }

  const handleUpdateNote = async () => {
    try {
      const request = await put(`/Note/UpdateNote/${noteId}`, { title: updateTitle, content: updateContent });
      const res = request.data;
      if (res?.message) {
        toast.success(res.message);
        setRefresh((v) => !v);
      }
    } catch (error) {
      const serverMsg = error?.response?.data?.message || error.message;
      toast.error(serverMsg || 'Update failed');
    }
  }

  const handleDelete = async () => {
   try {
     const request = await del(`/Note/deleteNote/${noteId}`);
     const res = request.data;
      if (res?.message) {
        toast.success(res.message);
        setRefresh((v) => !v);
      }

   } catch (error) {
    console.log('Error deleting note:', error);
    const serverMsg = error?.response?.data?.message || error.message;
    toast.error(serverMsg);
   }

  }


  useEffect(() => {
    const getNotes = async () => {
      try {
        const request = await get('/Note/GetNotes');
        const res = request.data;
        setNotes(res.notes ?? res);
      } catch (error) {
        console.log('Error fetching notes:', error);
      }
    };
    getNotes();
  }, [refresh]);

  return (
    <>
      <NoteModel
        title="Add New Note"
        titleChange={titleChange}
        contentChange={contentChange}
        handleCreateNote={handleCreateNote}
      />

      <UpdateNote
        title="Update Note"
        titleChange={(e) => setUpdateTitle(e.target.value)}
        contentChange={(e) => setUpdateContent(e.target.value)}
        handleUpdateNote={handleUpdateNote}
        updateTitle={updateTitle}
        updateContent={updateContent}
      />
      <DeleteNote handleDelete={handleDelete} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2 min-vh-100 bg-light">
            <Sidebar />
          </div>

          <div className="col-lg-10 col-md-10">
            <Navbar />
            <div className="content mt-4 mx-4">
              <h1 className="fw-bold">Notes</h1>
            </div>

            <div className="row">
              {notes && notes.map((elem) => (
                <div className="col-lg-4 col-md-4" key={elem._id ?? elem.id}>
                  <Notes
                    title={elem.title}
                    content={elem.content}
                    date={new Date(elem.createdAt).toLocaleDateString()}
                    handleUpdateNote={() => {
                      setNoteId(elem._id ?? elem.id);
                      setUpdateTitle(elem.title);
                      setUpdateContent(elem.content);
                      // optionally open modal here if your UpdateNote expects it
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home