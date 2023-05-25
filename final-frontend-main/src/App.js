import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  EmployeeContainer,
  TaskContainer,
  AllEmployeesContainer,
  AllTasksContainer,
  //NewEmployeeContainer, was giving me issues
  NewTaskContainer,
  EditTaskContainer
} from './components/containers';

import NewEmployeeContainer from './components/containers/NewEmployeeContainer';
//import { editEmployee } from "./store/actions/actionCreators";
import EditEmployeeContainer from './components/containers/EditEmployeeContainer';


// if you create separate components for adding/editing 
// a student or employee, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      {/* <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/employees"><button>Employees</button></Link>
        <Link to="/tasks"><button>Tasks</button></Link>
      </nav> */}
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/employees" component={AllEmployeesContainer} />
        <Route exact path="/employee/:id" component={EmployeeContainer} />
        <Route exact path="/tasks" component={AllTasksContainer} />
        <Route exact path="/newtask" component={NewTaskContainer} />
        <Route exact path="/newemployee" component={NewEmployeeContainer} />

        <Route exact path="/editemployee" component={EditEmployeeContainer} />

        <Route exact path="/task/:id" component={TaskContainer} />
        <Route exact path="/edittask/:id" component={EditTaskContainer} />
      </Switch>        
    </div>
  );
}

export default App;

