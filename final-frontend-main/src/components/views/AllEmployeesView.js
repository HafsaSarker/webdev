import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  const handleDeleteEmployee = (employeeId) => {
    // Call the deleteEmployee function passed as a prop
    props.deleteEmployee(employeeId);
  };

  if (!props.allEmployees.length) {
    return( <div>
      <p>There are no employees.</p>
      <Link to={`/newEmployee`}>
        <button>Add New Employee</button> 
      </Link>
      </div>);
  }

  return (
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h1>{name}</h1>
            </Link>
            <p>{employee.department}</p>
            <button onClick={() => handleDeleteEmployee(employee.id)}>X</button>
          </div>
        );
      })}
      <div>
        <Link to={`/newEmployee`}>
          <button>Add New Employee</button> 
        </Link>
      </div>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default AllEmployeesView;