// 1) Using promise to handle callback
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
// ---------------------------------------------------------------------------

// 2) Promise chaining
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(3, 4)
//   .then((sum) => {
//     console.log(sum);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// doing multiple promise at once could complicate it
add(3, 4)
  .then((sum) => {
    console.log(sum);

    add(sum, 5)
      .then((sum) => {
        console.log(sum);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

// use promise chaining

add(1, 1)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  .then((sum2) => {
    console.log(sum2);
    return add(sum2, 8);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });

// ---------------------------------------------------------------------------
