import React, { Component } from "react";
import { render } from "react-dom";
import store, { _loadCampuses, _loadStudents } from "./store";
import { Provider, connect } from "react-redux";

class _App extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.load_Campuses();
    await this.props.load_Students();
  }

  render() {
    console.log("****", this.props.campuses);
    return (
      <>
        <h2>HI WORLD</h2>
      </>
    );
  }
}

const mapState = (state) => {
  // console.log("-------", state);
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
    <App />
  </Provider>,
  document.querySelector("#root")
);
