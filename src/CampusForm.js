// class component
// have local state thats the same key as your db attributes
//bring in dispatch to add new campus
// onSubmit button is when you call and send it to app.post route. sent this.state to app.post route
// fro each input, write onChange function for it
//

import React, { Component } from "react";
import { connect } from "react-redux";
import { _addCampus } from "./store";

class CampusForm extends Component {
  constructor() {
    super();
    //local state in campusForm
    this.state = {
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ name: ev.target.value });
    console.log(ev.target.value);
  }
  render() {
    const { name, imageUrl, address, description } = this.state;
    const { onChange } = this;
    //console.log(this.props.addCampus);
    return (
      <>
        <form>
          <input value={name} onChange={onChange} />
          <button>SAVE </button>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => {
      dispatch(_addCampus(campus));
    },
  };
};

export default connect(mapDispatch)(CampusForm);
