const express = require("express");
require("./db/mongoose.js"); // Not grabbing or assigning anything from this file, because we want the file to run
const app = express();

const port = process.env.PORT || 3000;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

 

// midleware function needs to be above other app.use()
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     console.log("Get request not allowed");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next)=> {
//   res.status(503).send('Server is on maintenance mode! Come back later!')
// })

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abcsdsd" }, "secretlonglonglong", {
//     expiresIn: "1 seconds",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "secretlonglonglong");
//   console.log(data);
// };

// myFunction();
