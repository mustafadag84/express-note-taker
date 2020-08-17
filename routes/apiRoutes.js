
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information


var notesData = require("../db/db.json");
console.log(notesData);
var fs = require("fs");
// ===============================================================================

// ROUTING

module.exports = function(app) {

  // API GET Requests  
  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

// API POST Requests
  app.post("/api/notes", function(req, res) {
    let newNote = req.body
    newNote.id = Math.round(Math.random()*100000000);
    notesData.push(newNote);
    fs.writeFile("./db/db.json",JSON.stringify(notesData),function(err){console.log(err)});
    console.log(newNote);
    res.json(notesData);
  });

 // remove notes from notesData with id 
  app.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id
    let newNote = [];
    for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].id != noteId){
        newNote.push(notesData[i])
      }
    }
    fs.writeFile("./db/db.json",JSON.stringify(newNote),function(err){console.log("Deleted Note")});
    notesData = newNote;
    res.json(notesData);
  });

  
};
