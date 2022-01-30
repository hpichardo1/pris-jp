import React, { Component } from "react";
import { connect } from "react-redux";
import { _editCampus } from "../store";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.singleCampus ? this.props.singleCampus.name : "",
      imageUrl: this.props.singleCampus ? this.props.singleCampus.imageUrl : "",
      address: this.props.singleCampus ? this.props.singleCampus.address : "",
      description: this.props.singleCampus
        ? this.props.singleCampus.description
        : "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.singleCampus.id && this.props.singleCampus) {
      const { name, imageUrl, address, description } = this.props.singleCampus;
      this.setState({ name, imageUrl, address, description });
    }
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus(this.props.singleCampus.id, this.state);
    this.setState({
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    });
  }
  changeName(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onSubmit, changeName } = this;
    const { name, imageUrl, address, description } = this.state;
    console.log("INSIDE UPDATE CAMPUS", this.props.campuses);
    return (
      <>
        <h1>
          {this.props.singleCampus ? this.props.singleCampus.name : ""} UPDATE
          FORM
        </h1>
        <form onSubmit={onSubmit}>
          <input
            value={name}
            name="name"
            onChange={changeName}
            placeholder="EDIT NAME"
          />
          <input
            value={imageUrl}
            name="imageUrl"
            onChange={changeName}
            placeholder="EDIT IMAGEURL"
          />
          <input
            value={address}
            name="address"
            onChange={changeName}
            placeholder="EDIT ADDRESS"
          />
          <input
            value={description}
            name="description"
            onChange={changeName}
            placeholder=" EDIT DESCRIPTION"
          />
          <button>save</button>
        </form>
      </>
    );
  }
}

export default connect(
  (state) => {
    return {
      singleCampus: state.singleCampus,
      campuses: state.campuses,
    };
  },

  (dispatch, { history }) => {
    return {
      updateCampus: (id, campus) => {
        dispatch(_editCampus(id, campus, history));
      },
    };
  }
)(UpdateCampus);
