const baseUrl = "http://localhost:5555/api";

function login(username, password) {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
}

function logout(login) {
  return fetch(`${baseUrl}/auth/logout`)
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      login(null);
    })
    .catch((err) => console.log(err.message));
}

const auth = {
  login,
  logout,
};

export default auth;
