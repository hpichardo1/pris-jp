import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home({ campuses, students }) {
  return (
    <>
      <nav>
        <Link to="/campuses">CAMPUSES ({campuses.length})</Link>
        <Link to="/students"> STUDENTS ({students.length})</Link>
      </nav>
      <div>
        <h1>HOME PAGE!!!</h1>
      </div>
    </>
  );
}

const mapstate = ({ campuses, students }) => {
  return { campuses, students };
};

export default connect(mapstate)(Home);
