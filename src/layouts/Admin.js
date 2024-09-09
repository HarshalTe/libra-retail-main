import React from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
// reactstrap components
import { Container, Navbar, Nav } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import BranchSidebar from "components/Sidebar/BranchSidebar";

import routes from "routes.js";
import LinerLoader from "components/Loaders/LinerLoader";
import PreLoader from "components/Loaders/PreLoader";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (props.login.login.length == 0) {
    return <Redirect to={"/auth/login"} />;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Zoom}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />

      {window.location.pathname === "/admin/viewWorkInProgress" ||
      window.location.pathname === "/admin/splitScreen" ? (
        ""
      ) : props?.login?.login?.user ? (
        <Sidebar {...props} routes={routes} />
      ) : (
        <BranchSidebar />
      )}

      <div className="main-content" ref={mainContent}>
        {/* {console.log("pathname:", window.location.hash)} */}
        {window.location.hash === "#/admin/splitScreen" ? (
          ""
        ) : (
          <div className="header bg-gradient-info pb-2 pt-2 pt-md-6">
            <Container fluid>
              <AdminNavbar
                {...props}
                brandText={getBrandText(props.location.pathname)}
              />
            </Container>
          </div>
        )}

        <React.Suspense fallback={<PreLoader />}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
        </React.Suspense>

        {window.location.hash === "#/admin/splitScreen" ? (
          ""
        ) : (
          <Container fluid>
            <AdminFooter />
          </Container>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default withRouter(connect(mapStateToProps, null)(Admin));
