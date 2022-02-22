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


