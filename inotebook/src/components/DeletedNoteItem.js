import React, { useContext } from "react";
import NoteContext from '../context/notes/NoteContext';
import { Col, Card, Button } from 'react-bootstrap';
import '../style/NoteItem.css';

function DeletedNoteItem(props) {
  const context = useContext(NoteContext);
//   const { deleteNote } = context;
const {handleRecycle} = context
  const {note} = props;

  return (
    <Col md={12} className="mb-4"> {/* Extend the column size to fill the row */}
      <Card className="note-card shadow-sm hover-effect"> {/* Add shadow and hover effect */}
        <Card.Body>
          <Card.Title className="text-truncate note-title">{note.title}</Card.Title> {/* Add custom class for title */}
          <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
          <Card.Text>
            {note.description.length > 100 ? `${note.description.substring(0, 100)}...` : note.description} {/* Shorten description */}
          </Card.Text>
          <div className="note-actions"> {/* Remove flexbox to position buttons */}
            {/* <Button variant="primary" size="sm" onClick={() => { updateNote(note) }}>Update</Button> */}
            {/* <Button variant="danger" size="sm" onClick={() => { deleteNote(note._id) }}>Delete</Button> */}
            <Button variant="secondary" size="sm" onClick={() => handleRecycle(note,note._id)}>Recylce</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DeletedNoteItem;
