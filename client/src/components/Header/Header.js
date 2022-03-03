import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import auth from "../../service/userService";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ history }) => {
  const {
    isAuthenticated,
    login,
    onChangeSearchHandler,
    onClickSearchHandler,
    clearSearchHandler,
    setNumberToStorageHandler,
    numberOfTable,
    query,
    isAdmin,
  } = useContext(AuthContext);

  const adminButtons = (
    <>
      <li>
        <Link
          className="text-white"
          to="/"
          onClick={() => {
            auth.logout(history, login);
          }}
        >
          Logout
        </Link>
      </li>
      {isAdmin ? (
        <li>
          <Link to="/create" className="text-white">
            Add item
          </Link>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="bg-blue-700 h-auto">
      <nav>
        <ul className="flex justify-between mx-5 text-white items-center">
          {isAuthenticated ? (
            <li className="flex ">
              Table № <span className="font-bold">{numberOfTable}</span>
              <form onSubmit={setNumberToStorageHandler}>
                <input name="number" className="mx-2 w-10" type="number" />
                <button>set</button>
              </form>
            </li>
          ) : (
            ""
          )}

          <li className="flex items-center relative">
            {query && <button onClick={clearSearchHandler}>x</button>}
            <input
              value={query}
              type="text"
              placeholder="Search"
              className="p-1 my-1 rounded bg-gray-100"
              onChange={onChangeSearchHandler}
            />
            <button>
              <SearchIcon
                className="pointer text-gray-500"
                onClick={onClickSearchHandler}
              />
            </button>
          </li>
          <li>
            <NavLink to="/">
              <p className="">Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/category">
              <p>Menu</p>
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <div className="m-2 text-white">
                <NavLink to={"/basket"}>
                  <svg
                    width={35}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="shopping-basket"
                    className="svg-inline--fa fa-shopping-basket fa-w-18"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z"
                    ></path>
                  </svg>
                </NavLink>
              </div>
            </li>
          ) : (
            ""
          )}

          {isAuthenticated ? adminButtons : ""}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
