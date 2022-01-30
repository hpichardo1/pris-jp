import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home({ campuses, students }) {
  console.log(campuses);
  return (
    <>
      <div>
        <img src="CampusConnection.png" className="center" />
      </div>
      <nav>
        <Link to="/campuses">CAMPUSES ({campuses.length})</Link>
        <Link to="/students"> STUDENTS ({students.length})</Link>
      </nav>
    </>
  );
}

const mapstate = ({ campuses, students }) => {
  return { campuses, students };
};

export default connect(mapstate)(Home);
