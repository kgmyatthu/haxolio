import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";
import Navigation from './components/nav/nav.component';

import Home from './pages/home/Home.page';
import Notfound, { ErrorBoundary, GeneralError } from './components/handler/handler.component';
import Loading from './components/animations/loading.component';
import Blog, { Article, BlogResult } from './pages/blog/blog.page';

function App() {
  return (
    <>
      <Router>
        <ErrorBoundary>
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
              <Route exact path="/blog/search/:keyword">
                <BlogResult/>
              </Route>
              <Route path="*">
                <Notfound/>
              </Route>
            </Switch>
          </HashRouter>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
