import React, { useEffect } from "react";
import { connect } from "react-redux";
import { _loadSingleCampus } from "./store";
import { useParams, Link } from "react-router-dom";
import UpdateCampus from "./updateCampus";

function SingleCampus(props) {
  const { load_One_Campus, singleCampus } = props;
  // const id = props.match.params.id;
  // console.log("PROPS.ID", typeof id);

  const { id } = useParams();
  // console.log("!!!!!", typeof id);
  //hook
  useEffect(() => {
    load_One_Campus(id);
  }, [id]);
  // console.log("!!!!!!", singleCampus.students);
  // console.log(
  //   singleCampus.students
  //     ? singleCampus.students.map((el) => el.id)
  //     : "no students enrolled"
  // );
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
                  </li>
                </ul>
              ))
            : "Currently no students enrolled"}
        </li>
      </ul>
      <Link to={`/campuses/${singleCampus.id}/edit`}>EDIT CAMPUS</Link>
      <button>
        <Link to="/campuses">BACK TO CAMPUSES</Link>
      </button>
    </>
  );
}

const mapState = ({ singleCampus }) => {
  return { singleCampus };
};
const mapDispatch = (dispatch) => {
  return {
    load_One_Campus: (id) => {
      dispatch(_loadSingleCampus(id));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);

/*
class SingleCampus extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id)
    await this.props.load_One_Campus(id);
  }
  render() {
    console.log("?????", this.props.SingleCampus);
    return (
      <>
        <h1>SINGLE CAMPUS PAGE</h1>
      </>
    );
  }
}
*/
