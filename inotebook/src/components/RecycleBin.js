import React, { useEffect, useContext } from "react";
import DeletedNoteItem from "./DeletedNoteItem";
import NoteContext from "../context/notes/NoteContext";
import Loading from "./Loading";

function RecycleBin(props) {
    const { fetchAllDelNotes, delNotes, loading } = useContext(NoteContext);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            fetchAllDelNotes(); 
        }
    }, []); 

    return (
        <>
            <div className="row mx-3">
                <h2>Your Recycled Notes</h2>
                {delNotes.length === 0 ? <div className="container">No Notes To Display</div> : ""}
                {loading && <Loading />}
                {delNotes.map((note) => {
                    return (
                        <DeletedNoteItem note={note} key={note._id}/>
                    );
                })}
            </div>
        </>
    );
}

export default RecycleBin;
