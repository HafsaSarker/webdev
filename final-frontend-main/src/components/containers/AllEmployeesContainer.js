import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInstructorsThunk } from "../../store/thunks";
import { AllInstructorsView } from "../views";

function AllInstructorsContainer() {
  const allInstructors = useSelector((state) => state.allInstructors);
  const dispatch = useDispatch();

  //replaces componentDidMount
  useEffect(() => {
    dispatch(fetchAllInstructorsThunk());
  }, [dispatch]);

  return <AllInstructorsView allInstructors={allInstructors} />;
}

export default AllInstructorsContainer;
