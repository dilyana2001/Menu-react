import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const CategoryTemplate = ({ data }) => {
  return (
    <li className="m-2">
      <Button variant="contained" color="primary">
        <NavLink active="true" className="px-3 py-2 categories" to={`/${data}`}>
          {data}
        </NavLink>
      </Button>
    </li>
  );
};
export default CategoryTemplate;
