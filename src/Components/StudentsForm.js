import React, { Component } from "react";
import { connect } from "react-redux";
import { _addStudents } from "../store";

class StudentsForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gpa: 0,
      campusId: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeImageUrl = this.changeImageUrl.bind(this);
    this.changeGpa = this.changeGpa.bind(this);
    this.changeCampus = this.changeCampus.bind(this);
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.addStudent(this.state);
  }
  changeFirstName(ev) {
    this.setState({ firstName: ev.target.value });
  }
  changeLastName(ev) {
    this.setState({ lastName: ev.target.value });
  }
  changeEmail(ev) {
    this.setState({ email: ev.target.value });
  }
  changeImageUrl(ev) {
    this.setState({ imageUrl: ev.target.value });
  }
  changeGpa(ev) {
    this.setState({ gpa: ev.target.value });
  }
  changeCampus(ev) {
    this.setState({ campusId: ev.target.value });
  }

  render() {
    const { firstName, lastName, email, imageUrl, gpa, campusId } = this.state;
    const {
      onSubmit,
      changeFirstName,
      changeLastName,
      changeEmail,
      changeImageUrl,
      changeGpa,
      changeCampus,
    } = this;
    // console.log(this.props.addStudent);
    // console.log(this.props.campuses);
    return (
      <>
        <form onSubmit={onSubmit}>
          <label>FIRST NAME:</label>
          <input
            value={firstName}
            name="firstName"
            onChange={changeFirstName}
          />
          <label>LAST NAME:</label>
          <input value={lastName} name="lastName" onChange={changeLastName} />
          <label>EMAIL:</label>
          <input value={email} name="email" onChange={changeEmail} />
          <label>ImageUrl:</label>
          <input value={imageUrl} name="imageUrl" onChange={changeImageUrl} />
          <label>GPA:</label>
          <input value={gpa} name="gpa" onChange={changeGpa} />
          <label>CAMPUS:</label>
          <select value={campusId} name="campusId" onChange={changeCampus}>
            <option value="">--------------</option>
            {this.props.campuses.map((campus) => {
              return (
                <option value={campus.id} key={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select>
          <button>SAVE</button>
        </form>
      </>
    );
  }
}

const mapState = ({ campuses }) => {
  return {
    campuses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => {
      dispatch(_addStudents(student));
    },
  };
};

export default connect(mapState, mapDispatch)(StudentsForm);
