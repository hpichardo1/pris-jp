import { image } from "faker";
import React, { Component } from "react";
import { connect } from "react-redux";
import { _editStudent } from "../store";

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.singleStudent
        ? this.props.singleStudent.firstName
        : "",
      lastName: "",
      email: "",
      imageUrl: "",
      gpa: 0,
      campusId: this.props.singleStudent
        ? this.props.singleStudent.campusId
        : "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.singleStudent.id && this.props.singleStudent) {
      const { firstName, lastName, email, imageUrl, gpa, campusId } =
        this.props.singleStudent;
      this.setState({ firstName, campusId });
    }
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.updateStudent(this.props.singleStudent.id, this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      gpa: 0,
      campusId: "",
    });
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render() {
    const { onSubmit, onChange } = this;
    const { firstName, lastName, email, gpa, campusId, imageUrl } = this.state;
    console.log("!!!!!!!!!!!!!", this.props.updateStudent);
    return (
      <>
        <form onSubmit={onSubmit}>
          <input value={firstName} name="firstName" onChange={onChange} />
          <input
            value={lastName}
            name="lastName"
            onChange={onChange}
            placeholder="LAST NAME"
          />
          <input
            value={email}
            name="email"
            onChange={onChange}
            placeholder="EMAIL"
          />
          <input
            value={imageUrl}
            name="imageUrl"
            onChange={onChange}
            placeholder="IMAGEURL"
          />

          <input value={gpa} name="gpa" onChange={onChange} placeholder="GPA" />
          <input value={campusId} name="campusId" onChange={onChange} />

          <button>SAVE</button>
        </form>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    singleStudent: state.singleStudent,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    updateStudent: (id, student) => {
      dispatch(_editStudent(id, student, history));
    },
  };
};

export default connect(mapState, mapDispatch)(UpdateStudent);
