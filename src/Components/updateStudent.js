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
      imageUrl: this.props.singleStudent
        ? "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
        : "",
      gpa: "",
      //!trying to display name, shows on some, doesnt show on some
      campusId: this.props.singleStudent.campus
        ? this.props.singleStudent.campus?.name
        : "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    //! if it wasnt the single user before & now it is that single student
    if (!prevProps.singleStudent.id && this.props.singleStudent) {
      const { firstName, campusId } = this.props.singleStudent;
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
    console.log(
      "INSIDE UPDATE STUDENT FORM",
      this.props.singleStudent.campus?.name
    );
    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            value={firstName || ""}
            name="firstName"
            onChange={onChange}
            placeholder="FIRST NAME"
          />
          <input
            value={lastName || ""}
            name="lastName"
            onChange={onChange}
            placeholder="LAST NAME"
          />
          <input
            value={email || ""}
            name="email"
            onChange={onChange}
            placeholder="EMAIL"
          />
          <input
            value={imageUrl || ""}
            name="imageUrl"
            onChange={onChange}
            placeholder="IMAGEURL"
          />

          <input
            value={gpa || ""}
            name="gpa"
            onChange={onChange}
            placeholder="GPA"
          />
          <input
            value={campusId || ""}
            name="campusId"
            onChange={onChange}
            placeholder="campusId"
          />

          {/* trying to make a drop down for list of campuses student can choose from, gets maximum call stack */}
          {/* <select value={campusId} name="campusId" onChange={onChange}>
            <option value="">--------------</option>
            {this.props.campuses.map((campus) => {
              return (
                <option value={campus.id} key={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select>
          */}
          <button>SAVE</button>
        </form>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    singleStudent: state.singleStudent,
    //campuses: state.campuses,
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
