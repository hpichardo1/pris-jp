import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import store, { _loadCampuses, _loadStudents } from "./store";
import { Provider, connect } from "react-redux";
import Campuses from "./Campuses";
import Students from "./Students";
import Home from "./Home";

class _App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.load_Campuses();
    await this.props.load_Students();
  }

  render() {
    //console.log("****", this.props.students);
    const { students } = this.props;
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/campuses" component={Campuses} />
          <Route path="/students" component={Students} />
        </Switch>
      </>
    );
  }
}

const mapState = (state) => {
  // console.log("STATE", state);
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    load_Campuses: () => {
      dispatch(_loadCampuses());
    },
    load_Students: () => {
      dispatch(_loadStudents());
    },
  };
};

const App = connect(mapState, mapDispatch)(_App);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
