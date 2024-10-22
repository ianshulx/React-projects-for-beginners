import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function NotesSection(props) {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const [note, setnote] = useState({ id: "", titleToEdit: "", descriptionToEdit: "", tagToEdit: "default" });
    const { notes, fetchAllNotes, editNote, loading } = context;
    const refOpenModal = useRef(null);
    const refCloseModal = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            fetchAllNotes();
        } else {
            navigate("/login");
        }
    }, []);

    const updateNote = (currentNote) => {
        refOpenModal.current.click();
        document.querySelector("#titleToEdit").setAttribute("value", currentNote.title);
        document.querySelector("#descriptionToEdit").value = currentNote.description; // Set value directly for textarea
        document.querySelector("#tagToEdit").setAttribute("value", currentNote.tag);
        setnote({ id: currentNote._id, titleToEdit: currentNote.title, descriptionToEdit: currentNote.description, tagToEdit: currentNote.tag });
    };

    const handleinputchange = (event) => {
        setnote({ ...note, [event.target.name]: event.target.value });
    };

    const editNote_ = (event) => {
        event.preventDefault();
        editNote(note.id, note.titleToEdit, note.descriptionToEdit, note.tagToEdit);
        refCloseModal.current.click();
        props.showAlert("Note Updated Successfully", "success");
    };

    return (
        <>
            <button
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
                                        htmlFor="titleToEdit"
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
                                        htmlFor="descriptionToEdit"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="descriptionToEdit"
                                        name="descriptionToEdit"
                                        onChange={handleinputchange}
                                        minLength={5}
                                        required
                                        rows={4} // Set the number of visible rows
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="tagToEdit"
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
            </div>
            <div className="row mx-3">
                <h2>Your Notes</h2>
                {notes.length === 0 ? <div className="container">No Notes To Display</div> : ""}
                {loading && <Loading />}
                {notes.map((note) => {
                    return (
                        <NoteItem note={note} key={note._id} updateNote={updateNote} />
                    );
                })}
            </div>
        </>
    );
}

export default NotesSection;
