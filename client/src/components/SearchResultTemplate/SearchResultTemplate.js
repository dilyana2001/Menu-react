import ItemTemplate from "../ItemTemplate/ItemTemplate";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

function SearchResultTemplate() {
  const { itemsFromSearch } = useContext(AuthContext);
  return (
    <ul className="w-9/9 mx-auto mt-10">
      {itemsFromSearch.length
        ? itemsFromSearch.map((x) => <ItemTemplate key={x._id} data={x} />)
        : ""}
    </ul>
  );
}
export default SearchResultTemplate;
