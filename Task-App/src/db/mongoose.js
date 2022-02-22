const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});



// const her = new User({
//   name: "Michael C Johnson",
//   email: "mike@johnson.com",
//   age: 31,
//   password: "123456 ",
// });

// her
//   .save()
//   .then(() => {
//     console.log(her);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });



// const task = new Task({
//     description: 'Learn Mongoose',
//     isCompleted: false,
// });

// task.save().then(()=> {
//     console.log(task);
// }).catch((error)=> {
//     console.log(error);
// })

