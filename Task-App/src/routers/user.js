const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const multer = require('multer');

const auth = require("../middleware/auth");

router.use(express.json());

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// signing up a user should not make the user login again
router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    ); // self defined function

    const token = await user.generateAuthToken();

    res.send({ user, token });
    
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    // Logout only the session of the particular device,
    // there might be more than 1 login session
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // filter out the token that needs to be revoked
    // then save the rest of the tokens back to req.user
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    // Logout all sessions
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  // currently, patch update only allows for update to existing fields
  // If you want to add a field to the document
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    console.log("Invalid updates!");
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    //
    res.send(user);
  } catch (error) {
    console.log("Other error");
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove(); // mongoose has a remove method
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please use jpg or png image format'));
    }
    cb(undefined, true);
  }
})
// This has to be a separate route, because in here we are accepting form data instead of req.body json
router.post('/users/me/avatar', upload.single('avatar'), (req, res)=> {
  res.send();
})

module.exports = router;
