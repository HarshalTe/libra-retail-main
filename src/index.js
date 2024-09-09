import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStorage } from "./Redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import "assets/scss/argon-dashboard-react.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ForgotPassword from "layouts/ForgotPassword.js";
import RegisterUser from "layouts/RegisterUser.js";
import UpdatePassword from "layouts/UpdatePassword.js";
// import ForgotPassword from "./layouts/Auth";

const { persistor, store } = configureStorage();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Switch>
          <Route
            path="/admin"
            // exact
            render={(props) => <AdminLayout {...props} />}
          />
           <Route
                exact
                path="/forgot-password"
                name="ForgotPassword"
                component={ForgotPassword}
              />
           <Route
                exact
                path="/register-user"
                name="Register User"
                component={RegisterUser}
              />
                <Route
                exact
                path="/update-password"
                name="UpdatePassword"
                component={UpdatePassword}
              />
          <Route
            path="/auth"
            // exact
            render={(props) => <AuthLayout {...props} />}
          />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </HashRouter>
      {/* </BrowserRouter> */}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
