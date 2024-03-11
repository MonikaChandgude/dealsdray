import { useState } from "react";
import EmpContext from "./Empcontext";


const EmpState = (props) => {
  const host = "http://localhost:5000";
  const employeeInitial = [];


  const [employee, setEmployee] = useState(employeeInitial);

  //Add note
  
  const addEmployee = async (name, email, mobile, designation, gender, course, image) => {
    // api call

    const response = await fetch(`${host}/api/employee/createemp`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6eyJpZCI6IjY1ZWVkMGNjM2UwZjk4ZDdmMzk2Zjg5NiJ9LCJpYXQiOjE3MTAxNDk4MzZ9.bA6vt94z8YAwqIWE2RymlW5jCaDPJDavAWU3BKrdlVU",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({name, email, mobile, designation, gender, course, image}),
    });
    const employee =await response.json();
    setEmployee(employee.concat(employee));

   // console.log(response.json)
  };


  //GET ALL 
  const getEmployee = async () => {
    //api call

    const response = await fetch(`${host}/api/employee/fetchallemp`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6eyJpZCI6IjY1ZWVkMGNjM2UwZjk4ZDdmMzk2Zjg5NiJ9LCJpYXQiOjE3MTAxNDk4MzZ9.bA6vt94z8YAwqIWE2RymlW5jCaDPJDavAWU3BKrdlVU",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

  
    });
    const json = await response.json();
   
    setEmployee(json)
 };



  //Delete 
  const deleteEmployee =async (id) => {

    //Todo: api call
    const response = await fetch(`${host}/api/notes/deleteemp/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6eyJpZCI6IjY1ZWVkMGNjM2UwZjk4ZDdmMzk2Zjg5NiJ9LCJpYXQiOjE3MTAxNDk4MzZ9.bA6vt94z8YAwqIWE2RymlW5jCaDPJDavAWU3BKrdlVU",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

     
    });
    const json = response.json();
   // console.log(json)

    //console.log("deleted" + id);
    const newEmp = employee.filter((employee) => {
      return employee._id !== id;
    });
    setEmployee(newEmp);
  };



  //Edit
const editeEmployee = async (id, name, email, mobile, designation, gender, course, image) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6eyJpZCI6IjY1ZWVkMGNjM2UwZjk4ZDdmMzk2Zjg5NiJ9LCJpYXQiOjE3MTAxNDk4MzZ9.bA6vt94z8YAwqIWE2RymlW5jCaDPJDavAWU3BKrdlVU",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({name, email, mobile, designation, gender, course, image}),
    });
    const json = await response.json();
  //  console.log(json)

    let newEmp = JSON.parse(JSON.stringify(employee))
    //logic to api call
    for (let index = 0; index < newEmp.length; index++) {
      const element = employee[index];
      if (element._id === id) {
        newEmp[index].name = name;
        newEmp[index].email = email;
        newEmp[index].mobile = mobile;
        newEmp[index].designation = designation;
        newEmp[index].gender = gender;
        newEmp[index].course = course;
        newEmp[index].image = image;
        break;
      }
    
    }
    setEmployee(newEmp);
  };
  return (
    <EmpContext.Provider
      value={{ employee, setEmployee, addEmployee, deleteEmployee, editeEmployee, getEmployee}}
    >
      {props.children}
    </EmpContext.Provider>
  );
};

export default EmpState;
