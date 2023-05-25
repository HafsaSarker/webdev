import * as at from './actionTypes';

// ACTION CREATORS;
/** needs to be an action creator
 * for each action type
 */

// All employees
export const fetchAllEmployees = (employees) => {
  return {
    type: at.FETCH_ALL_EMPLOYEES,
    payload: employees,
  };
};
//Single employee
export const fetchEmployee = (employee) => {
  return {
    type: at.FETCH_EMPLOYEE,
    payload: employee,
  };
};

//add employee
export const addEmployee = (employee) => {
  return {
    type: at.ADD_EMPLOYEE,
    payload: employee,
  };
};

//delete employee
export const deleteEmployee = (employeeId) => {
  return {
    type: at.DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

//edit employee - NEW
export const editEmployee = (employeeId, firstName, lastName, department) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/employees/${employeeId}`, { firstName, lastName, department });
    const updatedEmployee = response.data;
    dispatch({ type: ActionTypes.EDIT_EMPLOYEE, payload: updatedEmployee });
  } catch (error) {
    console.error(error);
  }
};

//All tasks
export const fetchAllTasks = (tasks) => {
  return {
    type: at.FETCH_ALL_TASKS,
    payload: tasks,
  };
};

export const addTask = (task) => {
  return {
    type: at.ADD_TASK,
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: at.DELETE_TASK,
    payload: taskId,
  };
};


export const editTask = (task) => {
  return {
    type: at.EDIT_TASK,
    payload: task,
  };
};

//Single task
export const fetchTask = (task) => {
  return {
    type: at.FETCH_TASK,
    payload: task,
  };
};