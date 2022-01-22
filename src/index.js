import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import store, { _loadCampuses, _loadStudents, _unregisterId } from "./store";
import { Provider, connect } from "react-redux";
import Campuses from "./Components/Campuses";
import Students from "./Components/Students";
import Home from "./Components/Home";
import SingleCampus from "./Components/SingleCampus";
import SingleStudent from "./Components/SingleStudent";
import UpdateCampus from "./Components/updateCampus";

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
    return (
      <div id="mainPage">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/campuses/:id" component={SingleCampus} />
          <Route exact path="/students/:id" component={SingleStudent} />
          <Route exact path="/campuses/:id/edit" component={UpdateCampus} />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  //console.log("STATE", state);
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

//questions
//changing db campuses names, gets error on http for campuses with spaces
//forms
//
