import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _deleteCampus, _deleteStudent } from "./store";

function Campuses({ campuses, delete_Campus }) {
  return (
    <>
      <h2>HELLO THIS IS CAMPUSES PAGE!!</h2>
      <h3>CAMPUSES: ({campuses.length})</h3>
      <ul>
        {campuses.map((campus) => {
          return (
            <li key={campus.id}>
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
              <button onClick={() => delete_Campus(campus.id)}>X</button>
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

const mapState = ({ campuses }) => {
  return { campuses };
};

const mapDispatch = (dispatch) => {
  return {
    delete_Campus: async (id) => {
      dispatch(_deleteCampus(id));
    },
  };
};
export default connect(mapState, mapDispatch)(Campuses);
