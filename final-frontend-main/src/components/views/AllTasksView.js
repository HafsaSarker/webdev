import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllTasksView = (props) => {
  const handleDeleteTask = (taskId) => {
    // Call the deleteTask function passed as a prop
    props.deleteTask(taskId);
  };

  let { tasks } = props;

  if (!tasks.length) {
    return (
      <div>
        <p>There are no tasks.</p>
        <Link to={`/newtask`}>
          <button>Add New Task</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => {
        let title = task.title;
        return (
          <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h1>{title}</h1>
            </Link>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        );
      })}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
    </div>
  );
};

AllTasksView.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default AllTasksView;