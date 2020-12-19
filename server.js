let express = require('express');
let path = require("path");

let fs = require('fs');

let app = express();

let db = require('./db/db.json');


var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing | middlewear
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// not exactly sure what this is yet, but paul told me to add it
// and it worked.  thanks paul

app.use("/public", express.static(path.join(__dirname, "public")));

// basic html routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});


// api routes

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, notesData) => {
        if (err) throw err;
        res.json(JSON.parse(notesData));
    });
});


app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let notesData = JSON.parse(data);
        notesData.push(req.body);
        console.log(req.body);
        for (let i = 0; i < notesData.length; i++) {
            notesData[i].id = i + 1;
        }
        fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
            if (err) throw err;
            res.send(db);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let newNote = JSON.parse(data);
        for (let i = 0; i < newNote.length; i++) {
            if (newNote[i].id == req.params.id) {
                newNote.splice(i, 1);
            }
        }

        fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
            if (err) throw err;
            res.send(newNote);
        });
    });
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
