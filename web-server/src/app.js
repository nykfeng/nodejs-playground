const express = require("express");
const path = require('path')
const app = express();

const PORT = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);

// Go up a directory to find public
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


app.get("/weather", (req, res) => {
  res.send("Your weather");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
