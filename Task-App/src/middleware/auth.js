const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisatopsecrect"); // the secret is defined in user model
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }); // Find the user with id and has the correct token stored

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user; // Doing this just so that the route handler doesn't have to verify the user again
    // Also so that req.user will be THE user 
    next(); // If the user if found, we will allow it to run
  } catch (error) {
    res.status(401).send({ error: "Please authenticate yourself!" });
  }
};

module.exports = auth;
