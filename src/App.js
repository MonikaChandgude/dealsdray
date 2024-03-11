// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Navbar from './Component/Navbar';
//import CreateEmp from './Component/CreateEmp';
//import EmployeeList from './Component/EmployeeList';
import Login from './Component/Login';
import Home from './Component/Home';
//import EmpState from './context/employees/EmpState2';

import EmpState from './context/EmpState';
import Emp from './Component/Emp';
import Alert from './Component/Alert';

const App = () => {
  return (
    <div className="App">
     <EmpState>
      <Router>
      
      <Navbar/>
      <Alert/>
      <div className="container">
      <Routes>
       
       {/* <Route exact path="/about" element={<About/>} /> */}
       <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/employee" element={<Emp/>} /> 
        {/* <Route exact path="/emplist" element={<EmployeeList/>} /> */}
      
       
      </Routes>
      </div>
      </Router>
      </EmpState>
    </div>
  );
};

export default App;
