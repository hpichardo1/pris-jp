import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { _deleteStudent, _loadStudents } from "../store";
import StudentsForm from "./StudentsForm";

class Students extends Component {
  constructor() {
    super();
  }
  // MOUNTED THE STUDENTS
  // async componentDidMount() {
  //   await this.props.load_Students();
  // }

  render() {
    const { students, campuses } = this.props;
    console.log(campuses);
    console.log(students);
    return (
      <>
        <h3>STUDENTS: ({students.length ? students.length : ""})</h3>
        <ul>
          {students.map((student) => {
            return (
              <li key={student.id}>
                <div>
                  {student.firstName} {` `}
                  {student.campusId === undefined
                    ? ""
                    : campuses.map((campus) =>
                        student.campusId === campus.id
                          ? "attends " + campus.name
                          : "is currently not enrolled"
                      )[0]}{" "}
                  <button
                    onClick={() => {
                      this.props.delete_Student(student.id);
                    }}
                  >
                    X
                  </button>
                </div>
                <ul>
                  <li>
                    <Link to={`/students/${student.id}`}>
                      {/* {student.firstName} {student.lastName} */}
                      details for {student.firstName}
                    </Link>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
        <Route exact path="/students" component={StudentsForm} />

        <button>
          <Link to="/">BACK TO HOME</Link>
        </button>
      </>
    );
  }
}

const mapState = ({ students, campuses }) => {
  //console.log({ students });
  return { students, campuses };
};

const mapDispatch = (dispatch) => {
  return {
    delete_Student: (id) => {
      dispatch(_deleteStudent(id));
    },
    // load_Students: () => {
    //   dispatch(_loadStudents());
    // },
  };
};

export default connect(mapState, mapDispatch)(Students);
