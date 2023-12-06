import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { EmployeeList } from './employee-list.js';
import { EmployeeEdit } from './employee-edit.js';

function App() {
  const [ employeeToEdit, setEmployeeToEdit ] = useState(0);

  const editEmployee = (employeeId) => {
    setEmployeeToEdit(employeeId);
  }

  const editComplete = () => {
    setEmployeeToEdit(0);
  }

  return (
    <div className="App">
      <EmployeeList editCallback={ editEmployee }></EmployeeList>
      <EmployeeEdit editCompleteCallback={ editComplete } id={ employeeToEdit }></EmployeeEdit>
    </div>
  );
}

export default App;
