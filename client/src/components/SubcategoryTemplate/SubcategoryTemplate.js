import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const SubcategoryTemplate = ({ data, parent }) => {
  return (
    <li className="m-2">
      <Button variant="outlined" color="secondary">
        <NavLink
          active="true"
          className="px-3 py-2 subcategories"
          to={`/${parent}/${data}`}
        >
          {data}
        </NavLink>
      </Button>
    </li>
  );
};
export default SubcategoryTemplate;
