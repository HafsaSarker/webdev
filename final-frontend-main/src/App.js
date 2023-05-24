import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  EmployeeContainer,
  CourseContainer,
  AllEmployeesContainer,
  AllCoursesContainer,
  NewCourseContainer,
  EditCourseContainer
} from './components/containers';

// if you create separate components for adding/editing 
// a student or employee, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/employees" component={AllEmployeesContainer} />
        <Route exact path="/employee/:id" component={EmployeeContainer} />
        <Route exact path="/courses" component={AllCoursesContainer} />
        <Route exact path="/newcourse" component={NewCourseContainer} />
        <Route exact path="/course/:id" component={CourseContainer} />
        <Route exact path="/editcourse/:id" component={EditCourseContainer} />

      </Switch>        
    </div>
  );
}

export default App;

