import auth from "../../service/userService";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    auth.login(username.value, password.value).then((data) => {
      if (data.token === undefined) {
        return alert(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data._id);
      localStorage.setItem("isAdmin", data.isAdmin);
      login({ token: data.token, username: data.username, userId: data._id });
      history.push("/");
    });
  };

  return (
    <div className="text-center m-10">
      <form onSubmit={onSubmitHandler} className=" w-3/5 mx-auto">
        <div className="mb-3 flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="p-1 mt-1 font-bold"
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-1 mt-1 font-bold"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-900 text-white py-1 font-bold px-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
