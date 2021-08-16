import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";
import Navigation from './components/nav/nav.component';

import Home from './pages/home/Home.page';

function App() {
  return (
    <>
    <Router>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="*">
            <Navigation/>
          </Route>
        </Switch>
      </HashRouter>
    </Router>
    </>
  );
}

export default App;
