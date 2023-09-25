import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };
  return (
    <div className="flex gap-x-8 justify-center">
      <div className="flex items-center gap-x-2">
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
          className="radio"
        />
        All
      </div>
      <div className="flex items-center gap-x-2">
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
          className="radio"
        />
        Important
      </div>
      <div className="flex items-center gap-x-2">
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NONIMPORTANT")}
          className="radio"
        />
        Non Important
      </div>
    </div>
  );
};

export default VisibilityFilter;
