import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";
import Navigation from './components/nav/nav.component';

import Home from './pages/home/Home.page';
import Notfound from './components/handler/notfound.component';
import Loading from './components/animations/loading.component';
import Blog, { Article } from './pages/blog/blog.page';

function App() {
  return (
    <>
    <Router>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/blog">
            <Blog/>
          </Route>
          <Route exact path="/blog/:slug">
            <Article/>
          </Route>
          <Route path="*">
            <Notfound/>
          </Route>
        </Switch>
      </HashRouter>
    </Router>
    </>
  );
}

export default App;
