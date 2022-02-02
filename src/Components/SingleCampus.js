import React, { Component } from "react";
import { connect } from "react-redux";
import { _loadSingleCampus, _unregisterId } from "../store";
import { Link } from "react-router-dom";
import UpdateCampus from "./updateCampus";

class SingleCampus extends Component {
  constructor() {
    super();
  }

  render() {
    const { campus, students, editCampusId } = this.props;
    console.log('campus-->', campus)
    return (
      <>
        <nav id="campusNav">
          <h3 id="campusHeading"> SINGLE CAMPUS: </h3>
        </nav>
        <div id="campusHomeButton">
          <button>
            <Link to="/campuses">BACK TO CAMPUSES</Link>
          </button>
        </div>
        <hr></hr>
        <h1>SINGLE CAMPUS PAGE!!!!</h1>
        <img src={campus.imageUrl} />
        <h3>NAME: {campus.name}</h3>
        <ul>
          <li>ADDRESS: {campus.address}</li>
          <li>DESCRIPTION: {campus.description}</li>
          <li>
            ENROLLED STUDENTS:{" "}
            { students.length 
              ?
              students.map((student) => (
                    <ul key={student.id}>
                      <li>
                        <Link to={`/students/${student.id}`}>{student.firstName}</Link>{" "}
                        <button
                          onClick={() => {this.props.unregisterStudent(student.id)}}
                        >
                          unregister{" "}
                        </button>
                      </li>
                    </ul>
                  ))
                : "Currently no students enrolled"}
          </li>
        </ul>

        <UpdateCampus
          campus={campus}
          campuses={this.props.campuses}
          history={this.props.history}
        />
      </>
    );
  }
}

const mapState = (state, ownProps) => {
  const campusId = ownProps.match.params.id*1
  const campus = state.campuses.find( campus => campus.id === campusId) || {}
  const students = state.students.filter( student => student.campusId === campusId)
  console.log('WE HAVE STUDENTS--->', students)
  return { 
    campuses: state.campuses,
    students,
    campus,
    ownProps
  };
};
const mapDispatch = (dispatch) => {
  return {
    editCampusId: (student) => { dispatch(_unregisterId(student)) },
    unregisterStudent: (id)=>{ dispatch( _unregisterId(id) )}
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
