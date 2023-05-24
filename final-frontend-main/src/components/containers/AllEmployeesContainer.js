import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllEmployeesView } from "../views";
import { fetchAllEmployeesThunk, deleteEmployeeThunk } from "../../store/thunks";

function AllEmployeesContainer() {
  const allEmployees = useSelector((state) => state.allEmployees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployeesThunk());
  }, [dispatch]);

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployeeThunk(employeeId));
  };

  return (
    <AllEmployeesView
      allEmployees={allEmployees}
      deleteEmployee={handleDeleteEmployee}
    />
  );
}

export default AllEmployeesContainer;