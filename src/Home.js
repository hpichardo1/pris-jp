import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav>
        <Link to="/campuses">CAMPUSES </Link>
        <Link to="/students"> STUDENTS</Link>
      </nav>
      <div>
        <h1>HOME PAGE!!!</h1>
      </div>
    </>
  );
}

export default Home;
