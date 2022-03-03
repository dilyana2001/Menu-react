import itemService from "../../service/itemService";
import ItemTemplate from "../../components/ItemTemplate/ItemTemplate";
import { useState } from "react";

const SearchItem = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");

  const searchHandler = () => {
    if (!query || !query.trim()) {
      return;
    }
    itemService.searchByName(query.trim()).then(setResult);
  };

  return (
    <div>
      <div className="w-96 flex flex-col mx-auto my-10">
        <p className="font-bold text-5xl text-center text-blue-800 mb-10 w-44 self-center">
          Search
        </p>
        <ul className="nav-items flex justify-end items-center flex-col">
          <li className="mb-10 flex flex-col">
            <input
              value={query}
              type="text"
              placeholder="Search"
              className="p-1 my-1 rounded bg-gray-100 w-96"
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="self-center">
              <button
                onClick={searchHandler}
                className="bg-blue-500 text-blue-100 font-medium mt-1 rounded mr-1 mt-2 w-44"
              >
                Submit
              </button>
            </div>
          </li>
        </ul>
      </div>
      <ul>
        {result?.map((x) => (
          <ItemTemplate key={x._id} data={x} />
        ))}
      </ul>
    </div>
  );
};

export default SearchItem;
