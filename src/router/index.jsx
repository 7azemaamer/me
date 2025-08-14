import { Route, Router } from "@solidjs/router";
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout";

export const Routes = () => (
  <Router root={Layout}>
    <Route path="/" component={Home} />
  </Router>
);
