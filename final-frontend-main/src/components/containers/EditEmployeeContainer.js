/*
Submitting the form should: 
Make a request that causes the employee to be updated in the database  
Display the updates without needing to refresh the page
*/

// Import necessary dependencies and actions
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { editEmployeeThunk, fetchEmployeeThunk, fetchAllEmployeesThunk } from '../../store/thunks';

class EditEmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      department: '',
      redirect: false,
      redirectId: null,
      error: '',
    };
  }

  componentDidMount() {
    this.props.fetchEmployee(this.props.match.params.id);
    this.setState({
      firstname: this.props.employee.firstname,
      lastname: this.props.employee.lastname,
      department: this.props.employee.department,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.firstname === '' || this.state.lastname === '' || this.state.department === '') {
      this.setState({ error: 'Error: description cannot be empty' });
      return;
    }

    let employee = {
      id: this.props.employee.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
    };

    this.props.editEmployee(employee);

    this.setState({
      redirect: true,
      redirectId: this.props.employee.id,
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { employee, allEmployees, editEmployee, fetchEmployee } = this.props;

    if (this.state.redirect) {
      return (<Redirect to={`/employee/${this.state.redirectId}`} />);
    }

    return (
      <div>
        <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
          <input type="text" name="firstname" value={this.state.firstname} placeholder={employee.firstname} onChange={this.handleChange} />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
          <input type="text" name="lastname" value={this.state.lastname} placeholder={employee.lastname} onChange={this.handleChange} />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Department: </label>
          <input type="department" name="department" value={this.state.department} placeholder={employee.department} onChange={this.handleChange} />
          <br />

          <button type="submit">
            Submit
          </button>
        </form>

        {this.state.error !== "" && <p>{this.state.error}</p>}

        <div>
          Other employees:
          {allEmployees.map(emp => {
            if (emp.id !== employee.id) {
              return (
                <div key={emp.id}>
                  <Link to={`/employee/${emp.id}`}>
                    <h4>{emp.firstname} {emp.lastname}</h4>
                  </Link>
                  <button onClick={async () => { await editEmployee({ id: employee.id, employeeId: emp.id }); fetchEmployee(emp.id) }}>Assign this employee</button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    employee: state.employee,
    allEmployees: state.allEmployees,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
    fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditEmployeeContainer);
