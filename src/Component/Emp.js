import React, { useContext, useEffect, useRef, useState } from "react";
import Empcontext from "../context/employees/Empcontext";
import AddEmp from "./AddEmp";

import "./EmpTable.css";
import { useNavigate } from "react-router-dom";

const Emp = () => {
  const context = useContext(Empcontext);
  let navigate = useNavigate();
  const { employee, deleteEmp, getEmp ,editeEmp} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
        getEmp()
    }else{
        navigate("/login")
    }
    
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [emp, setEmp] = useState({
    id: "",
    ename: "",
    eemail: "",
    emobile: "",
    edesignation: "", // Initialize as an empty string
    egender: "",
    ecourse: [], // Initialize as an empty array
    eimage: "",
    createdate: "",
  });

  const updateEmp = (currentEmployee) => {
    ref.current.click();
    setEmp({id:currentEmployee._id, ename:currentEmployee.name,
        eemail:currentEmployee.email,
        emobile:currentEmployee.mobile,
        edesignation:currentEmployee.designation,
        egender:currentEmployee.gender,
        ecourse:currentEmployee.course,
        eimage:currentEmployee.image}
        );
  };

 

  const [showForm, setShowForm] = useState(false);

  const handleClick = (e) => {
    console.log("updating")
    editeEmp(
        emp.id,
      emp.ename,
      emp.eemail,
      emp.emobile,
      emp.edesignation,
      emp.egender,
      emp.ecourse,
      emp.eimage
    );
    refClose.current.click()
    e.preventDefault();
  };
 
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setEmp({ ...emp, course: [...emp.ecourse, value] });
      } else {
        setEmp({ ...emp, course: emp.ecourse.filter((c) => c !== value) });
      }
    } else {
      setEmp({ ...emp, [name]: value });
    }
  };

  const handleClick1 = () => {
    setShowForm(true);
  };
  return (
    <div>
      <div className="text-center">
        <button className="btn btn-primary my-3 " onClick={handleClick1}>
          Create Employee
        </button>
        {showForm && <AddEmp />}
      </div>
      {/* edite func*/}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Employee
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
             
              <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ename"
                        id="ename"
                        value={emp.ename}
                         onChange={onChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="eemail"
                        className="form-control"
                        name="eemail"
                        id="eemail"
                        value={emp.eemail}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="emobile"
                        id="emobile"
                        value={emp.emobile}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Designation:</label>
                      <select
                        className="form-select mx-2"
                        name="edesignation"
                        id="edesignation"
                       value={emp.edesignation}
                         onChange={onChange}
                        required
                      >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label>Gender:</label>
                      <label className="mx-1">
                        <input
                          type="radio"
                          id="egender1"
                          name="egender"
                          value="Male"
                         checked={emp.egender === "Male"}
                          onChange={onChange}
                          required
                        />{" "}
                        Male
                      </label>
                      <label className="mx-1">
                        <input
                          type="radio"
                          name="egender"
                          value="Female"
                          id="egender2"
                         checked={emp.egender === "Female"}
                          onChange={onChange}
                          required
                        />{" "}
                        Female
                      </label>
                    </div>

                    <div className="d-flex">
                      <label>Courses:</label>
                      <div>
                        <label className="form-check-label mx-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="MCA"
                            id="ecource"
                           // checked={emp.ecourse.includes("MCA")}
                            onChange={onChange}
                          />{" "}
                          MCA
                        </label>
                      </div>

                      <div>
                        <label className="form-check-label mx-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="BCA"
                            id="ecource"
                          //  checked={emp.ecourse.includes("BCA")}
                            onChange={onChange}
                          />{" "}
                          BCA
                        </label>
                      </div>
                      <div>
                        <label className="form-check-label mx-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="BCS"
                            id="ecource"
                        //   checked={emp.ecourse.includes("BCS")}
                            onChange={onChange
                             }
                          />{" "}
                          BCS
                        </label>
                      </div>
                    </div>

                    <div className="my-3">
                      <label htmlFor="formFile" className="form-label">
                        Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={onChange}
                       // value={emp.eimage}
                      />
                    </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
              //  disabled={emp.ename.length < 5 || emp.eemail.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2>Employee List</h2>

        <div className="text-center">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Courses</th>
                <th>Image</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp) => {
                return (
                  <tr key={emp._id}>
                    <td>{emp._id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobile}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.course}</td>
                    <td>{emp.image}</td>
                    <td>{emp.createdate}</td>
                    <td>
                      <i
                        className="fa-solid fa-user-pen mx-2"
                        onClick={() => updateEmp(emp)}
                      ></i>
                      <i
                        className="fa-solid fa-trash-can mx-2"
                        onClick={() => {
                          deleteEmp(emp._id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Emp;
