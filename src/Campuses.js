import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { _deleteCampus, _loadCampuses } from "./store";
import CampusForm from "./CampusForm";
/*
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
*/

class Campuses extends Component {
  constructor() {
    super();
  }
  // async componentDidMount() {
  //   await this.props.load_Campuses();
  // }
  render() {
    const { campuses, students } = this.props;
    console.log(campuses);
    console.log(students);

    return (
      <>
        <h3 id="campusHeading">CAMPUSES: ({campuses.length})</h3>
        <section id="campuses">
          <div>
            {campuses.map((campus) => {
              let length = students.reduce((prevVal, student) => {
                return student.campusId === campus.id
                  ? (prevVal += 1)
                  : prevVal;
              }, 0);
              return (
                <div key={campus.id}>
                  {campus.name} {` (Enrolled: ${length})`}
                  <div>
                    <Link to={`/campuses/${campus.id}`}>
                      Details for {campus.name}
                    </Link>
                  </div>
                  <div>
                    <button onClick={() => this.props.delete_Campus(campus.id)}>
                      Delete Campus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <Route exact path="/campuses" component={CampusForm} /> */}
          <CampusForm />
        </section>
        <button>
          <Link to="/">BACK TO HOME</Link>
        </button>
      </>
    );
  }
}

const mapState = ({ campuses, students }) => {
  return { campuses, students };
};

const mapDispatch = (dispatch) => {
  return {
    load_Campuses: () => {
      dispatch(_loadCampuses());
    },
    delete_Campus: (id) => {
      dispatch(_deleteCampus(id));
    },
  };
};
export default connect(mapState, mapDispatch)(Campuses);
