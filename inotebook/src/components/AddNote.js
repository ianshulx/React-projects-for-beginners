import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleAddNote = async (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully", "Success");
    setnote({ title: "", description: "", tag: "" });
    let response = await fetch("http://localhost:7000/api/userStats/updateStats",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({email : localStorage.getItem("email") , type : "added"})
    })
    let json =  response.json()
  };

  const handleInputChange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };

  const adjustHeight = (event) => {
    event.target.style.height = "auto"; // Reset height to auto to allow it to shrink if needed.
    event.target.style.height = event.target.scrollHeight + "px"; // Adjust height based on content.
  };

  return (
    <div className="container my-3">
      <h1>Add A Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={(e) => {
              handleInputChange(e);
              adjustHeight(e);
            }}
            rows="3"
            style={{ resize: "none", overflow: "auto", maxHeight: "150px" }}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleInputChange}
            minLength={5}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddNote}
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            note.tag.length < 5
          }
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddNote;
