import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Students({ students }) {
  return (
    <>
      <h2>HELLO THIS IS STUDENTS PAGE!!</h2>
      <h3>STUDENTS:</h3>
      <ul>
        {students.map((student) => {
          //console.log(student);
          return (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
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

const mapState = ({ students }) => {
  //console.log({ students });
  return { students };
};

export default connect(mapState)(Students);
