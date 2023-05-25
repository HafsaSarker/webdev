import React, { useState } from 'react';
import { Link } from "react-router-dom";

const EditEmployeeView = (props) => {
    const { employee, editEmployee, allEmployees, fetchEmployee } = props;
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [department, setDepartment] = useState(employee.department);
    const [error, setError] = useState('');
  
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
      setLastName(e.target.value);
    };
  
    const handleDepartmentChange = (e) => {
      setDepartment(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (firstName === '' || lastName === '' || department === '') {
        setError('Error: Fields cannot be empty');
        return;
      }
  
      const updatedEmployee = {
        id: employee.id,
        firstName,
        lastName,
        department
      };
  
      editEmployee(updatedEmployee);
  
      // Fetch the updated employee information
      fetchEmployee(employee.id);
    };
  
    return (
      <div>
        <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
          <br />
  
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
          <br />
  
          <label>Department:</label>
          <input type="department" value={department} onChange={handleDepartmentChange} />
          <br />
  
          <button type="submit">Update Employee</button>
        </form>
  
        {error && <p>{error}</p>}
  
        {/* Display other employees and assign functionality */}
        <div>
          Other employees:
          {allEmployees.map((otherEmployee) => {
            if (otherEmployee.id !== employee.id) {
              return (
                <div key={otherEmployee.id}>
                  <Link to={`/employee/${otherEmployee.id}`}>
                    <h4>{otherEmployee.firstName} {otherEmployee.lastName}</h4>
                  </Link>
                  <button
                    onClick={async () => {
                      await editEmployee({ id: employee.id, employeeId: otherEmployee.id });
                      fetchEmployee(employee.id);
                    }}
                  >
                    Assign this employee
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };
  
  export default EditEmployeeView;
  
