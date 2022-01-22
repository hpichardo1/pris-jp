import React, { useEffect } from "react";
import { connect } from "react-redux";
import { _loadSingleStudent } from "../store";
import { useParams, Link } from "react-router-dom";
import UpdateStudent from "./updateStudent";

function SingleStudent(props) {
  const { load_One_Student, singleStudent } = props;
  const { id } = useParams();
  console.log(singleStudent);

  useEffect(() => {
    load_One_Student(id);
  }, [id]);

  console.log("PROPS", props);
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
      <UpdateStudent singleStudent={singleStudent} history={props.history} />
      <button>
        <Link to="/students">BACK TO STUDENTS</Link>
      </button>
    </>
  );
}

const mapState = ({ singleStudent }) => {
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
