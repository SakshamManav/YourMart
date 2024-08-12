const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = "it is a secret";
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//    To create a new user or (signup)
router.post(
  "/signup",
  [
    body("name", "name should be atleast 5 characters").isLength({ min: 5 }),
    body("email", "not a valid email").isEmail(),
    body("password", "password should be of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const result = await validationResult(req);
    if (result.errors.length !== 0) {
      res.status(400).json({ msg: result.errors });
    } else {
      try {
        // Password hashing
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // storing user data to database when name,email,password condition meets
        const User = await new user({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        await User.save();
        const payload = {
          User: {
            id: User.id,
          },
        };
        const authToken = jwt.sign(payload, jwtSecret);
        res.send({ User, authtoken: authToken });
        console.log("saved successfully");
      } catch (error) {
        res.status(400).json({err:"Email is already used!"});
      }
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email", "not a valid email").isEmail(),
    body("password", "password should be of atleast 8 characters").exists(),
  ],
  async (req, res) => {
    let result = validationResult(req);
    if (result.errors.length !== 0) {
      res.status(404).json({ msg: result.errors });
    }
    else{
      try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        // checking if user exists with this email
        if (!User) {
          return res.status(404).json({err:"Invalid Credentials"});
        }
          // checking if given password matched with user password store in database liked with this email
  
          const passwordCompare = await bcrypt.compare(password, User.password);
          if (!passwordCompare) {
            return res.status(404).json({err:"Invalid Credentials"});
          }
          const payload = {
            User: {
              id: User.id,
            },
          };
          
          const authToken = jwt.sign(payload, jwtSecret);
          res.json({ authToken: authToken });
        
      } catch (error) {
        res.status(404).send({ error });
      }
    }
    
  }
);

//   To get the user
router.get("/userinfo", fetchuser, async (req, res) => {
  try {
    const userId = req.userId;
    const User = await user.findById(userId).select("-password");
    res.json({ User });
  } catch (error) {
    res.send("not a user");
  }
});
module.exports = router;
