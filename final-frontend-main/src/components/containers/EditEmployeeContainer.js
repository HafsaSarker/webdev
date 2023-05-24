/*
Submitting the form should: 
Make a request that causes the employee to be updated in the database  
Display the updates without needing to refresh the page
*/

//import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk } from '../../store/thunks';

class EditEmployeeContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstname : "",
        lastname: "",
        email: "", //idk lol
        //employeeId : "",
        //description: "",
        //priorityLevel: "",
        //completionStatus: false,
        redirect: false,
        redirectId: null,
        error: ""
      };
    }

    componentDidMount() {
        // OLD Getting task ID from URL
        // this.props.fetchTask(this.props.match.params.id);
        // this.props.fetchEmployees();
        // this.setState({
        //   description: this.props.task.description,
        //   priorityLevel: this.props.task.priorityLevel,
        //   completionStatus: this.props.task.completionStatus,
        // });

        //Getting employee ID from URL
        this.props.fetchEmployee(this.props.match.params.id);
        this.setState({
            firstname: this.props.employee.firstname,
            lastname: this.props.employee.lastname,
            email: this.props.employee.email,
        });
      }
    
      //same as before
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      //added xtra params in if statement
      handleSubmit = event => {
        event.preventDefault();
        // Implementing form validation
        if (this.state.firstname === "", this.state.lastname === "", this.state.email === "") {
          this.setState({ error: "Error: description cannot be empty" });
          return;
        }
    
        // Get new info for task from form input
        let task = {
            //OLD
          //id: this.props.task.id,
          //description: this.state.description,
          //priorityLevel: this.state.priorityLevel,
          //completionStatus: this.state.completionStatus
          id: this.props.employee.id,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email
        };
    
        // this.props.editTask(task);
        this.props.editEmployee(employee);
    
        //changed task -> employee
        this.setState({
          redirect: true,
          redirectId: this.props.employee.id
        });
      }
        //same as b4
      componentWillUnmount() {
        this.setState({ redirect: false, redirectId: null });
      }
      
      //changes here
      render() {
        let { employee, allEmployees, editEmployee, fetchEmployee } = this.props;
    
        // Go to single task view of the edited task
        if (this.state.redirect) {
          return (<Redirect to={`/employee/${this.state.redirectId}`} />)
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

                <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
                <input type="email" name="email" value={this.state.email} placeholder={employee.email} onChange={this.handleChange} />
                <br />

                <button type="submit">
                    Submit
                </button>
            </form>
    
            {this.state.error !== "" && <p>{this.state.error}</p>}
    
            {/* <div>
              Current assigned employee:
              {task.employeeId !== null ?
                <Link to={`/employee/${task.employeeId}`}>
                  <h4>{task.employee.firstname}</h4>
                </Link>
                : <div>No employee currently assigned</div>
              }
            </div> */}
    
            <div>
              Other employees:
              {allEmployees.map(employee => {
                if (employee.id !== task.employeeId) {
                  return (
                    <div key={employee.id}>
                      <Link to={`/employee/${employee.id}`}>
                        <h4>{employee.firstname} {employee.lastname}</h4>
                      </Link>
                      <button onClick={async () => { await editEmployee({ id: task.id, employeeId: employee.id }); fetchEmployee(employee.id) }}>Assign this employee</button>
                    </div>
                  )
                }
                return null;
              })}
            </div>
          </div>
        )
      }
    }

    
    // Map state to props
    const mapState = (state) => {
      return {
        employee: state.employee,
        allEmployees: state.allEmployees
      };
    };
    
    const mapDispatch = (dispatch) => {
      return {
        // editTask: (task) => dispatch(editTaskThunk(task)),
        // fetchTask: (id) => dispatch(fetchTaskThunk(id)),
        // fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
      }
    }

//export default EmployeeForm;
export default connect(mapState, mapDispatch)(EditEmployeeContainer);
//export default connect(mapState, mapDispatch)(EditTaskContainer);
//<button onClick={async () => { await editTask({ id: task.id, employeeId: employee.id }); fetchTask(task.id) }}>Assign this employee</button>
