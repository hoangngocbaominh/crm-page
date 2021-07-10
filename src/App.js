import "./App.css";
import "antd/dist/antd.css";
import Products from "./layouts/pages/products/Products";
import Orders from "./layouts/pages/orders/Orders";
import Dashboard from "./layouts/pages/dashboard/Dashboard";
import Login from "./layouts/pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductDetail from "./layouts/pages/products/ProductDetail";
function App() {
  const token = localStorage.getItem("accessToken");
  return (
    <>
      <Router>
        <Switch>
          {token ? (
            <>
              <Route
                exact
                path="/auth/login"
                component={() => <Redirect to="/dashboard" />}
              />
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/products/:id" component={ProductDetail} />
            </>
          ) : (
            <>
              <Route component={() => <Redirect to="/auth/login" />} />
              <Route exact path="/auth/login" component={Login} />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
