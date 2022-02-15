const express = require("express");
require("./db/mongoose.js"); // Not grabbing or assigning anything from this file, because we want the file to run
const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
    Task.find({})
      .then((tasks) => {
        res.send(tasks);
      })
      .catch((e) => {
        res.status(500).send();
      });
  });

  app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;
  
    Task.findById(_id).then((task)=> { 
      if (!task) {
          return res.status(404).send()
      }
      res.send(task);
    }).catch((e)=> {
      res.status(500).send()
    })
    console.log(req.params);
  });

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id).then((user)=> { 
      console.log(user);
    if (!user) {
        return res.status(404).send()
    }
    res.send(user);
  }).catch((e)=> {
    res.status(500).send()
  })
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
