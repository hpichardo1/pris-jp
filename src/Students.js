import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _deleteStudent } from "./store";

/*
function Students({ students, delete_Student }) {
  return (
    <>
      <h2>HELLO THIS IS STUDENTS PAGE!!</h2>
      <h3>STUDENTS: ({students.length})</h3>
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
                  delete_Student(student.id);
                }}
                // !where i left off, delete routes work, may have to use class component tho bc it doesnt work with functional component without hard reload
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button>
        <Link to="/">BACK TO HOME</Link>
      </button>
    </>
  );
}
*/

class Students extends Component {
  constructor() {
    super();
  }
  render() {
    const { students, delete_Student } = this.props;
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
                    delete_Student(student.id);
                  }}
                  // !where i left off, delete routes work, may have to use class component tho bc it doesnt work with functional component without hard reload
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
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
  };
};

export default connect(mapState, mapDispatch)(Students);
