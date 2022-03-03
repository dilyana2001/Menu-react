import AuthContext from "../../contexts/AuthContext";
import itemService from "../../service/itemService";
import { useEffect, useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";

const DetailsPage = ({ match, history }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const itemId = match.params.itemId;

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    itemService.getItem(itemId).then(setItem);
  }, [itemId, isAuthenticated]);

  const deleteHandler = () => {
    const ifDelete = window.confirm("Are u sure?");
    if (ifDelete) {
      itemService
        .deleteItem(match.params.itemId)
        .then(() => history.push("/category"));
    }
  };

  const ReadyTemp = () => {
    return (
      <p className="flex self-center">
        Kitchen:
        <span className=" self-center">
          <svg
            width={15}
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            className="svg-inline--fa fa-check fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
        </span>
      </p>
    );
  };

  return (
    <div className="w-4/5 mx-auto mt-10 px-10 py-1 bg-blue-600">
      <div className="my-2">
        <p className="font-bold text-center text-white text-3xl mb-1">
          {item.title} {item.price}€
        </p>
        <p className="font-medium text-white text-center">
          <span className="text-xl">{item.category}</span> <br />{" "}
          {item.subcategory}
        </p>
      </div>

      <div className="aspect-w-3 aspect-h-2 mb-4">
        <img
          src={item.imageUrl || "/images/coco.jpeg"}
          alt="item"
          className="object-cover w-auto h-auto mx-auto"
        />
      </div>
      <div className="flex flex-col justify-between mb-2">
        <p className="text-white text-center mt-2 mb-3">{item.description}</p>
      </div>
      <div className="flex justify-center my-2 text-white">
        <div
          onClick={deleteHandler}
          className="bg-red-500 text-center p-2 mr-2 rounded font-medium self-center cursor-pointer"
        >
          Delete
        </div>
        <NavLink
          to={`/edit/${item._id}`}
          className="bg-yellow-400 text-center p-2 rounded font-medium self-center mr-3"
        >
          Edit
        </NavLink>
        {item.isKitchen ? <ReadyTemp /> : <p>Kitchen: X</p>}
      </div>
    </div>
  );
};

export default withRouter(DetailsPage);
