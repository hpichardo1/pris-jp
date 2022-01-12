import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Campuses({ campuses }) {
  console.log(campuses);
  return (
    <>
      <h2>HELLO THIS IS CAMPUSES PAGE!!</h2>
      <h3>CLIENTS:</h3>
      <ul>
        {campuses.map((campus) => {
          return (
            <li key={campus.id}>
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
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

export default connect(mapState)(Campuses);
