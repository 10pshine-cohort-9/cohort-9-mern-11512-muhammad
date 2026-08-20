import pool from "../src/config/db.js";
import logger from "../src/config/logger.js"

export const createNote = async (req, res) => {
    try {
        const {title , content} = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and Content are required"
            });
        }

        const user_id = req.user.id;

        const new_note = await pool.query(
            `INSeRT INTO notes (user_id, title, content) 
            values ($1, $2, $3)
            RETURNING *`,
            [user_id, title, content]

        );
        
        logger.info("Note created Successfully")
        //console.log("upladed note")
        
        res.status(201).json({
            message: "Note created successfully",
            note: new_note.rows[0]
        });


    } catch(e) {
        logger.error(e, "Error creating note");

        res.status(500).json({
            message: "Server Error"
        });
    }
};   


export const getNotes = async (req, res) => {
  try {
    const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
        [req.user.id]);
    res.json(notes.rows);
  } catch(e) {

    logger.error(e, "Error fetching notes");
    res.status(500).json({message: "server error"})
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await pool.query(`
        UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP 
        WHERe id = $3 AND user_id = $4 RETURNING *`, 
        [title, content, req.params.id, req.user.id]
    );
    
    if (updated.rows.length === 0) {
        logger.warn({ noteId: req.params.id }, "Update failed. Note not found or unauthorized");

        return res.status(404).json({ message: "Note not Found or unauthorized" });
    } 
    logger.info({ noteId: req.params.id }, "Note updated successfully");
    res.json(updated.rows[0]);

  } catch(e) {

    logger.error(e, "Error updating note");
    res.status(500).json({message: "server error"})
  }
};

export const getNote = async (req, res) => {
    try {
        const note = await pool.query("SELECT * FROM notes WHERE id = $1 AND user_id = $2", 
            [req.params.id, req.user.id]);
        if (note.rows.length === 0) {
            return res.status(404).json({ message: "Note not Found" });
        } 
        
        res.json(note.rows[0]);

    } catch(e) {
        logger.error(e, "Error fetching note");
        res.status(500).json({message: "server error"})
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deleted = await pool.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", 
            [req.params.id, req.user.id]);
        if (deleted.rows.length === 0) {
            return res.status(404).json({ message: "Note not Found  or unauthorized" });
        } 

        res.json({message: "Note deletedd"});

    } catch(e) {
        logger.error(e, "Error deleting note");
        res.status(500).json({message: "server error"})
    }
};