import React, { useState } from "react";
import EmpContext from "./employees/Empcontext";

const EmpState = (props) => {
  const host = "http://localhost:5000";
  const employeeInitial = [];
  const [employee, setEmployee] = useState(employeeInitial);

//Get emp
  const getEmp = async() => {
    //api

    const response = await fetch(`${host}/api/employee/fetchallemp`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          
        },
  
       
      });
      const json =await response.json();
      console.log(json)
      setEmployee(json)
};

  //Add emp
  const addEmp = async(
    id,
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    image,
    createdate
  ) => {
    //api

    const response = await fetch(`${host}/api/employee/createemp`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          
        },
  
        body: JSON.stringify({
          name,
          email,
          mobile,
          designation,
          gender,
          course,
          image,
          createdate
        }),
      });
      const emp =await response.json();
      setEmployee(employee.concat(emp))

  
  };

  //Delete emp
  const deleteEmp =async (id) => {
  
    const response = await fetch(`${host}/api/employee/deleteemp/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          
        },
  
      
      });
      const json = response.json();
      console.log(json);

    console.log("delete" + id);
    const newEmployee = employee.filter((emp) => {
      return emp._id !== id;
    });
    setEmployee(newEmployee);
  };

  //edit emp

  const editeEmp = async (
    id,
    name,
    email,
    mobile,
    designation,
    gender,
    course,
    image
  ) => {
    const response = await fetch(`${host}/api/employee/updateemp/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      },

      body: JSON.stringify({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
      }),
    });
    const json = response.json();

    let newEmp = JSON.parse(JSON.stringify(employee));
    for (let index = 0; index < employee.length; index++) {
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
      setEmployee(newEmp)
    }
  };

  return (
    <EmpContext.Provider value={{ employee, addEmp, deleteEmp, editeEmp, getEmp }}>
      {props.children}
    </EmpContext.Provider>
  );
};

export default EmpState;
