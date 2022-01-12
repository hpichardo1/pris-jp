import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { _loadSingleCampus } from "./store";
import { useParams } from "react-router-dom";
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

function SingleCampus(props) {
  const { load_One_Campus, SingleCampus } = props;
  const id = props.match.params.id;
  console.log(id);
  //hook
  useEffect(() => {
    load_One_Campus(id);
  }, [id]);
  return (
    <>
      <h1>SINGLE CAMPUS PAGE!!!!</h1>
    </>
  );
}

const mapState = ({ SingleCampus }) => {
  console.log({ SingleCampus });
  return { SingleCampus };
};
const mapDispatch = (dispatch) => {
  return {
    load_One_Campus: (id) => {
      dispatch(_loadSingleCampus(id));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
