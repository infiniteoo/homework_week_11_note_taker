let express = require('express');
let path = require("path");

let fs = require('fs');

let app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

// basic html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});



app.get("/api/notes", function (req, res) {
    // we need to return the contents of db.json 
    return res.json(fs.readFile("./db/db.json"));

}); 


/* 
app.post("/api/notes", function (req, res) {




}); */




/*
The following API routes should be created:


GET /api/notes - Should read the db.json file and return all saved notes as JSON.


POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.


DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.



*/
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
