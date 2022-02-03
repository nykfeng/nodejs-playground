const fs = require("fs");

const get = function () {
  return "notes";
};

const add = function (title, body) {
  const notes = load();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    save(notes);
    console.log("Note added");
  } else {
    console.log("note title has been taken!");
  }
};

const save = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const load = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  get,
  add,
  save,
  load,
};
