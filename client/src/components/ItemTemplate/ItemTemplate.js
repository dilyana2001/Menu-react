import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import PopupTemplate from "../PopupTemplate/PopupTemplate";

const ItemTemplate = ({ data }) => {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);

  return (
    <li className="mb-3 bg-blue-600 p-1 border border-b-2 border-blue-800 border-t-0 border-l-0 border-r-2">
      <div className="flex justify-between">
        <div className="flex w-2/3 aspect-w-3 aspect-h-2 pr-1 pb-1">
          <div onClick={() => setPopup(true)} className="cursor-pointer">
            <img
              src={data.imageUrl || "/images/coco.jpeg"}
              alt="item"
              className="object-cover w-20 h-16"
            />
          </div>
          <p className="font-bold text-white pl-2">{data.title}</p>
        </div>
        <div className="self-center">
          {isAuthenticated && isAdmin ? (
            <Link
              className="cursor-pointer text-blue-900 px-1 py-0.5 bg-blue-100 rounded border-2 border-blue-800"
              to={`/item/${data._id}`}
            >
              admin
            </Link>
          ) : (
            ""
          )}
        </div>
        <div>
          {popup && (
            <PopupTemplate item={data} handler={() => setPopup(false)} />
          )}
        </div>
        {isAuthenticated ? (
          <div className="flex flex-col w-1/3 pr-10">
            <p className="text-white font-bold self-end">{data.price}€</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <p className="text-white">{data.description}</p>
      </div>
    </li>
  );
};
export default ItemTemplate;
