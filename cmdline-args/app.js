const { notStrictEqual } = require("assert");
const yargs = require("yargs");
const notes = require("./notes.js");

const command = process.argv[2];

// console.log(process.argv);

// customized yargs version
yargs.version("1.1.0");

// create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.add(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.remove(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List a note",
  handler() { 
    notes.list();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.read(argv.title);
  },
});

// console.log(yargs.argv);
// parsing and logging
yargs.parse();
