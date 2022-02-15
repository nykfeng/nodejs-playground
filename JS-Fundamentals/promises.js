const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("There was an error!");
    // resolve([1, 4, 7]);
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log("Success! ", result);
  })
  .catch((error) => {
    console.log(error);
  });
