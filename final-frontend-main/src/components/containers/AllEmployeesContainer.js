import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployeesThunk } from "../../store/thunks";
import { AllEmployeesView } from "../views";

function AllEmployeesContainer() {
  const allEmployees = useSelector((state) => state.allEmployees);
  const dispatch = useDispatch();

  //replaces componentDidMount
  useEffect(() => {
    dispatch(fetchAllEmployeesThunk());
  }, [dispatch]);

  return <AllEmployeesView allEmployees={allEmployees} />;
}

export default AllEmployeesContainer;