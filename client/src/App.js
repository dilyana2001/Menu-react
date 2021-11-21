import { Route, Switch } from 'react-router';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CreateItem from './components/CreateItem/CreateItem';
import DetailsPage from './components/DetailsPage/DetailsPage';
import EditItem from './components/EditItem/EditItem';
import DeleteItem from './components/DeleteItem/DeleteItem';
import SearchItem from './components/SearchItem/SearchItem';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App bg-green-400">
      <Header />

      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/create' component={CreateItem} />
        <Route path='/edit/:itemId' component={EditItem} />
        <Route path='/delete/:itemId' component={DeleteItem} />
        <Route path='/delete/:itemId' component={DeleteItem} />
        <Route path='/item/:itemId' component={DetailsPage} />
        <Route path='/search' component={SearchItem} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
