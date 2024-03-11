const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchemp = require("../middleware/fetchemp");


const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Employee = require("../models/Employee");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });



//route: 1 Create  emp
router.post(
  "/createemp",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("mobile", "mobile must be atleast 10 characters").isLength({
      min: 10,
    }),
  ],

  fetchemp,
  async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, course, image } =
        req.body;
      // const image = req.file.path;

      // If there are errors, return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newEmployee = new Employee({
        login: req.login.id,
        name,
        email,
        mobile,
        image,
        designation,
        gender,
        course,
      });
     const savedEmp =  await newEmployee.save();
      res.json(savedEmp);

     // res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//Route 1 -----Get all emp: GET "/api/employee/getemp - Login required".
router.get("/fetchallemp", fetchemp, async (req, res) => {
  try {
    const emp = await Employee.find({login: req.login.id});
    res.json(emp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});


//Route 3 -----Update Notes: PUT "/api/notes/updatenote - Login required".
router.put(
  "/updateemp/:id",
  fetchemp,

  async (req, res) => {
    const {  name, email, mobile, designation, gender, course, image } = req.body;

    try {
      //Create new Object
      const newEmp = {};
      if (name) {
        newEmp.name = name;
      }
      if (email) {
        newEmp.email = email;
      }
      if (mobile) {
        newEmp.mobile = mobile;
      }
      if (designation) {
        newEmp.mobile = mobile;
      }
      if (gender) {
        newEmp.gender = gender;
      }
      if (course) {
        newEmp.course = course;
      }
      if (image) {
        newEmp.image = image;
      }

      //Find the note to be updated and update
      let emp = await Employee.findById(req.params.id);
      if (!emp) {
        return res.status(404).send("not allowd");
      }

      if (emp.login.toString() !== req.login.id) {
        return res.status(401).send("not allowd");
      }

      emp = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: newEmp },
        { new: true }
      );
      res.json({ emp });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
  }
);



//Route 4 ----Delete emp: DELETE "/api/notes/deletenote - Login required".
router.delete("/deleteemp/:id", fetchemp, async (req, res) => {
  const {  name, email, mobile, designation, gender, course, image  } = req.body;

  try {
    //Create new Object
 
    const newEmp = {};
    if (name) {
      newEmp.name = name;
    }
    if (email) {
      newEmp.email = email;
    }
    if (mobile) {
      newEmp.mobile = mobile;
    }
    if (designation) {
      newEmp.mobile = mobile;
    }
    if (gender) {
      newEmp.gender = gender;
    }
    if (course) {
      newEmp.course = course;
    }
    if (image) {
      newEmp.image = image;
    }

    //Find the emp to be deleted and delete it
    let emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if user owns this notes
    if (emp.login.toString() !== req.login.id) {
      return res.status(401).send("not allowd");
    }

    emp = await Employee.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", emp: emp });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
