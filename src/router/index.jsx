import { Route, Router } from "@solidjs/router";
import Home from "../pages/Home";
import Layout from "../components/Layout/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Blogs, BlogPost } from "../pages/Blogs";

export const Routes = () => (
  <Router root={Layout}>
    <Route path="/" component={Home} />
    <Route path="/blogs" component={Blogs} />
    <Route path="/blogs/:slug" component={BlogPost} />
    <Route path={"/dashboard"} component={Dashboard} />
  </Router>
);
