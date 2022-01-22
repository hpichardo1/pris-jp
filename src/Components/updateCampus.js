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
    //console.log("------", this.props.singleCampus);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  componentDidUpdate(prevProps) {
    //meaning if it wasnt there before and now you hav the current singleCampus.id
    if (!prevProps.singleCampus.id && this.props.singleCampus) {
      const { name, imageUrl, address, description } = this.props.singleCampus;
      this.setState({ name, imageUrl, address, description });
    }
    //console.log(this.props);
  }
  onSubmit(ev, history) {
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

// const mapState = (state, otherProps) => {
//   const campus = state.campuses.find(
//     ((campus) => campus.id === otherProps.match.params.id * 1) || {}
//   );
//   console.log("??????", campus.id);
//   return {
//     campus,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     updateCampus: (id, campus) => {
//       dispatch(_singleCampus(id, campus));
//     },
//   };
// };

export default connect(
  (state) => {
    return {
      singleCampus: state.singleCampus,
    };
  },
  // (state, otherProps) => {
  //   const editCampus = state.campuses.find(
  //     ((campus) => campus.id === otherProps.match.params.id * 1) || {}
  //   );
  //   console.log("!!!!!!!!!!!!!!", editCampus);
  //   return {
  //     editCampus,
  //   };
  // },
  (dispatch) => {
    return {
      updateCampus: (id, campus) => {
        dispatch(_editCampus(id, campus));
      },
    };
  }
)(UpdateCampus);

//export default UpdateCampus;
//!//!questions to ask, why is it not this.props.singleCampus.id?
//!this.props.singleCampus gives me back an obj
