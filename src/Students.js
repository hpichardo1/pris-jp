import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Router, Switch, Route } from "react-router-dom";
import { _deleteStudent, _loadStudents } from "./store";
import CampusForm from "./CampusForm";

class Students extends Component {
  constructor() {
    super();
  }
  // MOUNTED THE STUDENTS
  // async componentDidMount() {
  //   await this.props.load_Students();
  // }

  render() {
    const { students } = this.props;
    return (
      <>
        <h2>HELLO THIS IS STUDENTS PAGE!!</h2>
        <h3>STUDENTS: ({students.length ? students.length : ""})</h3>
        <ul>
          {students.map((student) => {
            //console.log(student);
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>

                <button
                  onClick={() => {
                    this.props.delete_Student(student.id);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {/* route for forms then display form component */}
        <CampusForm />
        <div></div>

        <button>
          <Link to="/">BACK TO HOME</Link>
        </button>
      </>
    );
  }
}

const mapState = ({ students }) => {
  //console.log({ students });
  return { students };
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
