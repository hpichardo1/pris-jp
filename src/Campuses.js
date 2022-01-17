import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _deleteCampus, _loadCampuses } from "./store";
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
//!when deleting a campus, the studeent associated with that campus also gets deleted but when refrshed it displays the data that was originally there

class Campuses extends Component {
  constructor() {
    super();
  }
  // async componentDidMount() {
  //   await this.props.load_Campuses();
  // }
  render() {
    const { campuses } = this.props;
    //console.log(this.props.delete_Campus);
    return (
      <>
        <h2>HELLO THIS IS CAMPUSES PAGE!!</h2>
        <h3>CAMPUSES: ({campuses.length})</h3>
        <ul>
          {campuses.map((campus) => {
            return (
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                <button onClick={() => this.props.delete_Campus(campus.id)}>
                  X
                </button>
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
}

const mapState = ({ campuses }) => {
  return { campuses };
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
