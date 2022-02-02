import React, { Component } from "react";
import { connect } from "react-redux";
import { _editCampus } from "../store";

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.campus ? this.props.campus.name : "",
      imageUrl: this.props.campus ? this.props.campus.imageUrl : "",
      address: this.props.campus ? this.props.campus.address : "",
      description: this.props.campus? this.props.campus.description : "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
  }
  componentDidUpdate(prevProps) {
    //make sure to compare values NOT objects/arrays
    if (prevProps.campus.id !== this.props.campus.id) {
      const { name, imageUrl, address, description } = this.props.campus;
      this.setState({ name, imageUrl, address, description });
    }
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus(this.props.campus.id, this.state);
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
    // console.log('this.props.campus-->', this.props.campus)
    // console.log('this.state-->', this.state)
  
    //console.log("INSIDE UPDATE CAMPUS", this.props.campuses);
    return (
      <>
        <h1>
          {this.props.singleCampus ? this.props.singleCampus.name : ""} UPDATE
          FORM
        </h1>
        <form onSubmit={onSubmit}>
          <input
            value={name || ""}
            name="name"
            onChange={changeName}
            placeholder="EDIT NAME"
          />
          <input
            value={this.state.imageUrl || ""}
            name="imageUrl"
            onChange={changeName}
            placeholder="EDIT IMAGEURL"
          />
          <input
            value={this.state.address || ""}
            name="address"
            onChange={changeName}
            placeholder="EDIT ADDRESS"
          />
          <input
            value={this.state.description || ""}
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


const mapDispatch = (dispatch)=>{
  return {
    updateCampus: (id, campus) => { dispatch(_editCampus(id, campus, history)) }
 }
}
export default connect(null, mapDispatch)(UpdateCampus)

// export default connect(
//   (state, ownProps) => {
//     const campus = state.campuses.find( campus => campus.id === ownProps.match.params.id*1) || {}
//     return {
//       singleCampus: state.singleCampus,
//       campuses: state.campuses,
//       campus
//       //campuses: state.campuses,
//     };
//   },

//   (dispatch, { history }) => {
//     return {
//       updateCampus: (id, campus) => {
//         dispatch(_editCampus(id, campus, history));
//       },
//     };
//   }
// )(UpdateCampus)