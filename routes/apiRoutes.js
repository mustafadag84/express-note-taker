// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../db/db.json");
console.log(notesData);
var fs = require("fs");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

// 
  app.post("/api/notes", function(req, res) {
    let newNote = req.body
    newNote.id = Math.round(Math.random()*100000000);
    notesData.push(newNote);
    fs.writeFile("./db/db.json",JSON.stringify(notesData),function(err){console.log(err)});
    console.log(newNote);
    res.json(notesData);
  });

  app.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id
    // remove notes from notesData with id 
    fs.writeFile("./db/db.json",JSON.stringify(notesData),function(err){console.log(err)});
    res.json(notesData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  
};
