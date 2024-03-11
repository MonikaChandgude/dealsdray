import React, { useContext, useState } from 'react'
import Empcontext from '../context/employees/Empcontext';

const AddEmp = () => {
    const context = useContext(Empcontext);
  
    const {addEmp} = context;
    
    const [emp, setEmp] = useState({
      id: "",
      name: "",
      email: "",
      mobile: "",
      designation: "", // Initialize as an empty string
      gender: "",
      course: [], // Initialize as an empty array
      image: "",
      createdate:""
    });



   const handleClick=(e)=>{
    e.preventDefault()
        addEmp(
          emp.id,
          emp.name,
          emp.email,
          emp.mobile,
          emp.designation,
          emp.gender,
          emp.course,
          emp.image,
          emp.createdate
        );
      setEmp( {id: "",
      name: "",
      email: "",
      mobile: "",
      designation: "", // Initialize as an empty string
      gender: "",
      course: [], // Initialize as an empty array
      image: "",
      createdate:""})
   }

   const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setEmp({ ...emp, course: [...emp.course, value] });
      } else {
        setEmp({ ...emp, course: emp.course.filter((c) => c !== value) });
      }
    } else {
      setEmp({ ...emp, [name]: value });
    }
  };

 
  //  const onChange=(e)=>{
  //      setEmp({...emp,[e.target.name]: e.target.value})
  //  }
  return (
    <div>
      
      
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card my-4" style={{ borderRadius: "15px", height: "50%" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an Employee</h2>
                  <form style={{ margin: "10px", padding: "20px" }}>
                    {/* Other input fields */}

                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={emp.name}
                         onChange={onChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={emp.email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        id="mobile"
                        value={emp.mobile}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Designation:</label>
                      <select
                        className="form-select mx-2"
                        name="designation"
                       value={emp.designation}
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
                          name="gender"
                          value="Male"
                         checked={emp.gender === "Male"}
                          onChange={onChange}
                          required
                        />{" "}
                        Male
                      </label>
                      <label className="mx-1">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                         checked={emp.gender === "Female"}
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
                            checked={emp.course.includes("MCA")}
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
                            checked={emp.course.includes("BCA")}
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
                           checked={emp.course.includes("BCS")}
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
                      
                      />
                    </div>
                    {/* Other input fields */}
                    <button type="submit" className='btn btn-primary' onClick={handleClick}>Add Employee</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
     
   

   
    </div>
  )
}

export default AddEmp
