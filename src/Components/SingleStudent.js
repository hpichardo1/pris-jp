import React, { Component } from "react";
import { connect } from "react-redux";
import { _loadSingleStudent } from "../store";
import { Link } from "react-router-dom";
import UpdateStudent from "./updateStudent";

class SingleStudent extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    const id = this.props.match.params.id * 1;
    this.props.load_One_Student(id);
  }
  render() {
    const { singleStudent, campuses } = this.props;
    return (
      <>
        <h1>SINGLE STUDENT PAGE!!!</h1>
        <img src={singleStudent.imageUrl} />
        <h3>
          NAME: {singleStudent.firstName} {singleStudent.lastName}
        </h3>

        <ul>
          <li>email: {singleStudent.email}</li>
          <li>GPA: {singleStudent.gpa}</li>
          <li>
            Attends:{" "}
            {singleStudent.campusId ? (
              <Link to={`/campuses/${singleStudent.campusId}`}>
                {singleStudent.campus?.name}
              </Link>
            ) : (
              " Currently not enrolled "
            )}
          </li>
        </ul>
        <UpdateStudent
          singleStudent={singleStudent}
          campuses={campuses}
          history={this.props.history}
        />
        <button>
          <Link to="/students">BACK TO STUDENTS</Link>
        </button>
      </>
    );
  }
}

const mapState = ({ singleStudent, campuses }) => {
  return { singleStudent, campuses };
};

const mapDispatch = (dispatch) => {
  return {
    load_One_Student: (id) => {
      dispatch(_loadSingleStudent(id));
    },
  };
};
export default connect(mapState, mapDispatch)(SingleStudent);
