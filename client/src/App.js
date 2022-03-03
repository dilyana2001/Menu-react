import { Route, Switch } from "react-router";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import CreateItem from "./components/CreateItem/CreateItem";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import EditItem from "./components/EditItem/EditItem";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import AuthContext from "./contexts/AuthContext";
import Basket from "./components/Basket/Basket";
import itemService from "./service/itemService";
import SearchResultTemplate from "./components/SearchResultTemplate/SearchResultTemplate";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [itemsFromSearch, setItems] = useState("");
  const [numberOfTable, setNumberOfTable] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const table = localStorage.getItem("table");
  const isAdmine = localStorage.getItem("isAdmin");

  useEffect(() => {
    if (token) {
      setUser({ username, token, userId });
    }
  }, [username, token, userId]);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAdmine === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAdmine]);

  useEffect(() => {
    if (table) {
      setNumberOfTable(table);
    }
  }, [table]);

  const login = (userData) => {
    setUser(userData);
  };

  const onChangeSearchHandler = (e) => {
    setQuery(e.target.value);
  };

  const onClickSearchHandler = () => {
    if (!query || !query.trim()) {
      return;
    }
    itemService.searchByName(query.trim()).then((data) => {
      setItems(data);
    });
  };

  const clearSearchHandler = () => {
    setQuery("");
    setItems([]);
  };

  const setNumberToStorageHandler = (e) => {
    e.preventDefault();
    const { number } = e.target;
    localStorage.setItem("table", number.value);
    setNumberOfTable(number.value);
  };

  const authInfoContext = {
    isAuthenticated: username != null,
    username: user?.username,
    token: user?.token,
    userId: user?.userId,
    login,
    isAdmin,
    onClickSearchHandler,
    onChangeSearchHandler,
    clearSearchHandler,
    setNumberToStorageHandler,
    query,
    itemsFromSearch,
    numberOfTable,
  };

  return (
    <div className="App relative">
      <AuthContext.Provider value={authInfoContext}>
        <Header />
        <SearchResultTemplate />
        <Switch>
          <ProtectedRoute
            path="/basket"
            exact
            component={Basket}
            isAuth={isAuth}
          />
          <AdminProtectedRoute
            path="/create"
            exact
            component={CreateItem}
            isAuth={isAuth}
            isAdmin={isAdmin}
          />
          <AdminProtectedRoute
            path="/edit/:itemId"
            exact
            component={EditItem}
            isAuth={isAuth}
            isAdmin={isAdmin}
          />
          <AdminProtectedRoute
            path="/item/:itemId"
            exact
            component={DetailsPage}
            isAuth={isAuth}
            isAdmin={isAdmin}
          />

          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={Login} />
          <Route path="/category" exact component={CategoryPage} />
          <Route
            path="/:category/:subcategory"
            exact
            component={CategoryPage}
          />
          <Route path="/:category" exact component={CategoryPage} />
        
        </Switch>

        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
