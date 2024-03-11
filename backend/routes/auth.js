const express = require("express");
const { body, validationResult } = require("express-validator");
//const bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
const router = express.Router();
const Login = require("../models/Login");
var fetchemp = require("../middleware/fetchemp");

const JWT_SECRET = "myname$mona";

//rout 1 -- create user
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //if user already exist then return error
      let login = await Login.findOne({ email: req.body.email });
      if (login) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email is already exist" });
      }

      //   bcrypt.genSalt(10, async (err, salt) => {
      //     if (err) {
      //       throw err;
      //     }

      //     const secPass = await bcrypt.hash(req.body.password, salt);

      //create new user
      login = await Login.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const data = {
        login: {
          id: login.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occer");
    }
  }
);

//route 2 --authenticate user

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").exists(),
  ],
  async (req, res) => {
  let  success= false
    //if errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let login = await Login.findOne({ email });
      if (!login) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }
      //  const passwordCompare = await bcrypt.compare(password, user.password);
      if (login.password !== password) {
        success = false;
        return res.status(400).json({success,
          error: "Please try to login with correct Credentials",
        });
      }
      const data = {
        user: {
          id: login.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occer");
    }
  }
);

router.post("/getuser", fetchemp, async (req, res) => {
  try {
    const employeeID = req.login.id;
    const login = await Login.findById(employeeID).select("-password");
    res.send(login);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
 
});

module.exports = router;
