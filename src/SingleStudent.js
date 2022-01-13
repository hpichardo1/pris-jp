import React, { useEffect } from "react";
import { connect } from "react-redux";
import { _loadSingleStudent } from "./store";
import { useParams, Link } from "react-router-dom";

function SingleStudent(props) {
  const { load_One_Student, singleStudent } = props;
  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    load_One_Student(id);
  }, [id]);
  console.log(singleStudent.campus);
  return (
    <>
      <h1>SINGLE STUDENT PAGE!!!</h1>
      <img src={singleStudent.imageUrl} />
      <h3>
        NAME: {singleStudent.firstName} {singleStudent.lastName}
      </h3>
      <h2>ATTENDS:</h2>
      <ul>
        <li>email: {singleStudent.email}</li>
        <li>GPA: {singleStudent.gpa}</li>
      </ul>

      <button>
        <Link to="/students">BACK TO STUDENTS</Link>
      </button>
    </>
  );
}

const mapState = ({ singleStudent }) => {
  console.log(singleStudent);
  return { singleStudent };
};

const mapDispatch = (dispatch) => {
  return {
    load_One_Student: (id) => {
      dispatch(_loadSingleStudent(id));
    },
  };
};
export default connect(mapState, mapDispatch)(SingleStudent);
