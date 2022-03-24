import './App.css';
import Banner from './Components/Banner';
import Favourites from './Components/Favourites';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      
      <Navbar />
      <Switch>
        <Route path='/' exact render={(props) => (
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
        )} />
        <Route path='/favourites' component={Favourites} />
      </Switch>
      {/* <Banner />
      <Movies />
      <Favourites /> */}
    </Router>
  );
}

export default App;
