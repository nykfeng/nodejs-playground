const express = require("express");
require("./db/mongoose.js"); // Not grabbing or assigning anything from this file, because we want the file to run
const app = express();

const port = process.env.PORT || 3000;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const multer = require("multer");
const upload = multer({
  dest: "images", //destination path
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // cb(new Error('File must be of designated format'));
    // cb(undefined, true);
    // cb(undefined, false);
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("PLease upload a Word document"));
    }
    cb(undefined, true);
  },
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});
