import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { _deleteStudent, _loadStudents, _loadCampuses } from "../store";
import StudentsForm from "./StudentsForm";

class Students extends Component {
  constructor() {
    super();
  }

  render() {
    const { students, campuses } = this.props;

    return (
      <>
        <nav id="studentNav">
          <h3>STUDENTS: ({students.length ? students.length : ""})</h3>
        </nav>
        <div id="homeButton">
          <button className="homeButton">
            <Link to="/">BACK TO HOME</Link>
          </button>
        </div>
        <hr></hr>
        <section>
          <div id="students">
            {students.map((student) => {
              return (
                <div key={student.id} className="studentList">
                  <div>
                    {student.firstName} {` `}
                    {}
                    {student.campusId === null
                      ? "no school currently"
                      : campuses.map((campus) =>
                          student.campusId === campus.id
                            ? "attends " + campus.name
                            : ""
                        )}{" "}
                    <div>
                      <button
                        onClick={() => {
                          this.props.delete_Student(student.id);
                        }}
                      >
                        click to delete
                      </button>
                    </div>
                    <div>
                      <Link to={`/students/${student.id}`}>
                        details for {student.firstName}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Route exact path="/students" component={StudentsForm} />
        </section>
      </>
    );
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses };
};

const mapDispatch = (dispatch) => {
  return {
    delete_Student: (id) => {
      dispatch(_deleteStudent(id));
    },
    loadStudents: () => {
      dispatch(_loadStudents);
    },
  };
};

export default connect(mapState, mapDispatch)(Students);
