import React, { Component } from "react";
import { connect } from "react-redux";
import { _editCampus } from "./store";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.editCampus ? this.props.editCampus.name : "",
    };
    console.log("------", this.props.editCampus);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  componentDidUpdate(prevProps) {
    //meaning if it wasnt there before and now you hav the current editCampus.id
    if (!prevProps.editCampus && this.props.editCampus.id) {
      this.setState({ name: this.props.editCampus.name });
    }
    //console.log(this.props);
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus(this.props.editCampus.id, this.state);
    //console.log(ev.target.value);
  }
  changeName(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onSubmit, changeName } = this;
    const { name } = this.state;
    return (
      <>
        <h1>CAMPUS UPDATE FORM</h1>
        <form onSubmit={onSubmit}>
          <input value={name} name="name" onChange={changeName} />
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
//       dispatch(_editCampus(id, campus));
//     },
//   };
// };

export default connect(
  (state, otherProps) => {
    const editCampus = state.campuses.find(
      ((campus) => campus.id === otherProps.match.params.id * 1) || {}
    );
    //console.log(editCampus);
    return {
      editCampus,
    };
  },
  (dispatch) => {
    return {
      updateCampus: (id, campus) => {
        dispatch(_editCampus(id, campus));
      },
    };
  }
)(UpdateCampus);

//export default UpdateCampus;
