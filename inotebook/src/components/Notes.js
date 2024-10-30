import React, { useCallback } from "react";
import { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import { useEffect } from "react";
import AddNote from "./AddNote";
import { useRef } from "react";
import { useState } from "react";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom"

function Notes(props) {
  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const [note, setnote] = useState({id:"",titleToEdit:"",descriptionToEdit:"",tagToEdit:"default"})
  const { notes, fetchAllNotes,editNote,loading} = context;
  const refOpenModal = useRef(null);
  const refCloseModal = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchAllNotes();
    }
    else {
      navigate("/login")
    }
    // props.showAlert("Notes fetched Successfully","success")
  }, []);
  const updateNote = (currentNote) => {
    refOpenModal.current.click()
    document.querySelector("#titleToEdit").setAttribute("value",currentNote.title)
    document.querySelector("#descriptionToEdit").setAttribute("value",currentNote.description)
    document.querySelector("#tagToEdit").setAttribute("value",currentNote.tag)
    setnote({id:currentNote._id,titleToEdit:currentNote.title,descriptionToEdit:currentNote.description,tagToEdit:currentNote.tag})
  };
  const handleinputchange = (event) => {
    setnote({...note,[event.target.name]:event.target.value})
  }
  const editNote_ = (event) => {
    event.preventDefault()
    editNote(note.id,note.titleToEdit,note.descriptionToEdit,note.tagToEdit)
    refCloseModal.current.click()
    props.showAlert("Note Updated SuccessFully","success")
  }
  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      {/* <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refOpenModal}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        tabIndex="-1"
        id="exampleModal"
        aria-hidden="true"
        aria-labelledby="exampleModelLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" className="my-3">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titleToEdit"
                    name="titleToEdit"
                    onChange={handleinputchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descriptionToEdit"
                    name="descriptionToEdit"
                    onChange={handleinputchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tagToEdit"
                    name="tagToEdit"
                    onChange={handleinputchange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refCloseModal}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={editNote_}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Notes;
