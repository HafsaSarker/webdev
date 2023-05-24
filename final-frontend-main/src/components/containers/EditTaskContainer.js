import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk } from '../../store/thunks';

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priorityLevel: "",
      completionStatus: false,
      redirect: false,
      redirectId: null,
      error: ""
    };
  }

  componentDidMount() {
    // Getting task ID from URL
    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployees();
    this.setState({
      description: this.props.task.description,
      priorityLevel: this.props.task.priorityLevel,
      completionStatus: this.props.task.completionStatus,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // Implementing form validation
    if (this.state.description === "") {
      this.setState({ error: "Error: description cannot be empty" });
      return;
    }

    // Get new info for task from form input
    let task = {
      id: this.props.task.id,
      description: this.state.description,
      priorityLevel: this.state.priorityLevel,
      completionStatus: this.state.completionStatus
    };

    this.props.editTask(task);

    this.setState({
      redirect: true,
      redirectId: this.props.task.id
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { task, allEmployees, editTask, fetchTask } = this.props;

    // Go to single task view of the edited task
    if (this.state.redirect) {
      return (<Redirect to={`/task/${this.state.redirectId}`} />)
    }

    return (
      <div>
        <form style={{ textAlign: 'center' }} onSubmit={(e) => this.handleSubmit(e)}>
          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
          <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange={(e) => this.handleChange(e)} />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Priority Level: </label>
          <input type="text" name="priorityLevel" value={this.state.priorityLevel || ''} placeholder={task.priorityLevel} onChange={(e) => this.handleChange(e)} />
          <br />

          <label style={{ color: '#11153e', fontWeight: 'bold' }}>Completion Status: </label>
          <input type="checkbox" name="completionStatus" checked={this.state.completionStatus} onChange={(e) => this.handleChange(e)} />
          <br />

          <button type="submit">
            Submit
          </button>
        </form>

        {this.state.error !== "" && <p>{this.state.error}</p>}

        <div>
          Current assigned employee:
          {task.employeeId !== null ?
            <Link to={`/employee/${task.employeeId}`}>
              <h4>{task.employee.firstname}</h4>
            </Link>
            : <div>No employee currently assigned</div>
          }
        </div>

        <div>
          Other employees:
          {allEmployees.map(employee => {
            if (employee.id !== task.employeeId) {
              return (
                <div key={employee.id}>
                  <Link to={`/employee/${employee.id}`}>
                    <h4>{employee.firstname}</h4>
                  </Link>
                  <button onClick={async () => { await editTask({ id: task.id, employeeId: employee.id }); fetchTask(task.id) }}>Assign this employee</button>
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
    task: state.task,
    allEmployees: state.allEmployees
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
  }
}

export default connect(mapState, mapDispatch)(EditTaskContainer);