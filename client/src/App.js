import React from "react";
import SideNav, {
      Toggle,
      Nav,
      NavItem,
      NavIcon,
      NavText,
} from "@trendmicro/react-sidenav";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "mdbreact/dist/css/mdb.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Components/home/Home";
import SearchRecipesByIngredients from './Components/searchByIngredients/SearchByIngredients'
import Recipe from "./Components/recipe/Recipe";
import SpinnerPage from "./Components/spinnerPage/Spinner";

function App() {
      return (
            <div style={{ height: "100%" }}>
                  <Router>
                        <Route
                              render={({ location, history }) => (
                                    <React.Fragment>
                                          <SideNav
                                                id="nav-style"
                                                onSelect={(selected) => {
                                                      const to = "/" + selected;
                                                      if (
                                                            location.pathname !==
                                                            to
                                                      ) {
                                                            history.push(to);
                                                      }
                                                }}
                                          >
                                                <SideNav.Toggle />
                                                <SideNav.Nav defaultSelected="home">
                                                      <NavItem eventKey="">
                                                            <NavIcon>
                                                                  <i
                                                                        className="fa fa-fw fa-home"
                                                                        style={{
                                                                              fontSize:
                                                                                    "1.75em",
                                                                        }}
                                                                  />
                                                            </NavIcon>
                                                            <NavText>
                                                                  Home
                                                            </NavText>
                                                      </NavItem>
                                                      <NavItem eventKey="devices">
                                                            <NavIcon>
                                                                  <i
                                                                        className="fa fa-fw fa-device"
                                                                        style={{
                                                                              fontSize:
                                                                                    "1.75em",
                                                                        }}
                                                                  />
                                                            </NavIcon>
                                                            <NavText>
                                                                  Devices
                                                            </NavText>
                                                      </NavItem>
                                                </SideNav.Nav>
                                          </SideNav>
                                          <main style={{ height: "100%" }}>
                                                <Route
                                                      path="/"
                                                      exact
                                                      component={Home}
                                                />
                                                <Route
                                                      path="/Recipe"
                                                      component={Recipe}
                                                />
                                                <Route path='/SearchRecipeByIngredients' component={SearchRecipesByIngredients} />
                                                <Route path='/Spinner' component={SpinnerPage} />
                                                {/* <Route path="/" exact component={props => <RootComponent />} /> */}
                                                {/* <Route path="/home" component={props => <Home />} /> */}
                                                {/* <Route path="/devices" component={props => <Devices />} /> */}
                                          </main>
                                    </React.Fragment>
                              )}
                        />
                  </Router>
            </div>
      );
}

export default App;