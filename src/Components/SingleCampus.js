import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import { _loadSingleCampus, _unregisterId } from "../store";
import { Link } from "react-router-dom";
import UpdateCampus from "./updateCampus";

class SingleCampus extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    const id = this.props.match.params.id * 1;
    this.props.load_One_Campus(id);
  }

  render() {
    const { singleCampus, editCampusId } = this.props;
    return (
      <>
        <h1>SINGLE CAMPUS PAGE!!!!</h1>
        <img src={singleCampus.imageUrl} />
        <h3>NAME: {singleCampus.name}</h3>
        <ul>
          <li>ADDRESS: {singleCampus.address}</li>
          <li>DESCRIPTION: {singleCampus.description}</li>
          <li>
            ENROLLED STUDENTS:{" "}
            {singleCampus.students && singleCampus.students.length !== 0
              ? singleCampus.students.map((el) => (
                  <ul key={el.id}>
                    <li>
                      <Link to={`/students/${el.id}`}>{el.firstName}</Link>{" "}
                      <button
                        onClick={() => {
                          editCampusId(el);
                          this.props.load_One_Campus(singleCampus.id);
                        }}
                      >
                        unregister{" "}
                      </button>
                    </li>
                  </ul>
                ))
              : "Currently no students enrolled"}
          </li>
        </ul>

        <UpdateCampus singleCampus={singleCampus} />

        <button>
          <Link to="/campuses">BACK TO CAMPUSES</Link>
        </button>
      </>
    );
  }
}

const mapState = ({ singleCampus }) => {
  console.log("????", singleCampus.students);
  return { singleCampus };
};
const mapDispatch = (dispatch) => {
  return {
    load_One_Campus: (id) => {
      dispatch(_loadSingleCampus(id));
    },
    editCampusId: (student) => {
      dispatch(_unregisterId(student));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
