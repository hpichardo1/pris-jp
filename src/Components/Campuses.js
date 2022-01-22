import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { _deleteCampus, _loadCampuses } from "../store";
import CampusForm from "./CampusForm";

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
        <nav id="campusNav">
          <h3 id="campusHeading">CAMPUSES: ({campuses.length})</h3>
        </nav>
        <div id="campusHomeButton">
          <button>
            <Link to="/">BACK TO HOME</Link>
          </button>
        </div>
        <hr></hr>
        <section id="campuses">
          <div>
            {campuses.map((campus) => {
              let length = students.reduce((prevVal, student) => {
                return student.campusId === campus.id
                  ? (prevVal += 1)
                  : prevVal;
              }, 0);
              return (
                <div className="campusList" key={campus.id}>
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

          <CampusForm />
        </section>
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
