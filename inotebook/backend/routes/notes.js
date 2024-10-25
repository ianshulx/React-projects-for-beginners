const express = require("express")
const router = express.Router()
var fetchuser = require("../middleware/fetchUser")
const Notes = require("../models/Notes")
const DeletedNotes = require("../models/DeletedNotes")
const { body, validationResult } = require("express-validator")

// Route 1 : fetching notes by get route /api/notes/fetchnotes
router.get("/fetchnotes",
    fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id })
            res.json(notes)
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })

    router.get("/fetchdeletednotes",
        fetchuser,
        async (req, res) => {
            try {
                const notes = await DeletedNotes.find({ user: req.user.id })
                res.json(notes)
            }
            catch (error) {
                console.error(error.message)
                res.status(400).send("some error ocuured")
            }
        })

// Route 2 :To add a new note by post method at route /api/notes//addnote
router.post("/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Enter atleast a five character discription").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json({ err: err.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNotes = await note.save()
            res.json(saveNotes)
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })

// Route 3 :To upadte a note  by put method at route /api/notes//updatnote
router.put("/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            // create a new note object
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // find the note to be updated
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("NOT FOUND") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("NOT ALLOWED")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note)
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })



// Route 4 :To deleta  a note by delete method at route /api/notes//deletenote
router.delete("/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            // find the note to be deleted and delete
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("NOT FOUND") }
            // Allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Sucess": "Note has been deleted", note: note })
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })
router.delete("/deletenote1/:id",
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            console.log("yesssss")
            // find the note to be deleted and delete
            let note = await DeletedNotes.findById(req.params.id)
            if (!note) { res.status(404).send("NOT FOUND") }
            // Allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await DeletedNotes.findByIdAndDelete(req.params.id)
            res.json({ "Sucess": "Note has been deleted", note: note })
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })

router.post("/fetchANote/:id",
    async (req, res) => {
        try {
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("NOT FOUND") }
            res.json({ "Sucess": "Note Fetched", note: note })
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })
router.post("/addIntoDelete",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Enter atleast a five character discription").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            console.log("valled")
            const { title, description, tag } = req.body;
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json({ err: err.array() });
            }
            const note = new DeletedNotes({
                title, description, tag, user: req.user.id
            })
            const deletednotes = await note.save()
            res.json(deletednotes)
        }
        catch (error) {
            console.error(error.message)
            res.status(400).send("some error ocuured")
        }
    })

module.exports = router
