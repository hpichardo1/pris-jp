// class component
// have local state thats the same key as your db attributes
//bring in dispatch to add new campus
// onSubmit button is when you call and send it to app.post route. sent this.state to app.post route
// fro each input, write onChange function for it
//

import React, { Component } from "react";
import { connect } from "react-redux";
import { _addCampus } from "../store";

class CampusForm extends Component {
  constructor() {
    super();
    //local state in campusForm
    this.state = {
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }
  //an event that allows us to change the state and then set that value
  //an event that allows us to get the target and value
  changeName(ev) {
    this.setState({ name: ev.target.value });
  }
  changeUrl(ev) {
    this.setState({ imageUrl: ev.target.value });
  }
  changeAddress(ev) {
    this.setState({ address: ev.target.value });
  }
  changeDescription(ev) {
    this.setState({ description: ev.target.value });
  }

  onSubmit(ev) {
    //allows us to prevent the default
    //basically the save button
    ev.preventDefault();
    this.props.addCampus(this.state);
    this.setState({
      name: "",
      imageUrl: "",
      address: "",
      description: "",
    });
    this.props.history.push("/campuses");
  }
  render() {
    const { name, imageUrl, address, description } = this.state;
    const {
      changeName,
      onSubmit,
      changeUrl,
      changeAddress,
      changeDescription,
    } = this;
    //console.log(this.props.addCampus);
    return (
      <>
        <form onSubmit={onSubmit} className="form">
          <table>
            <tbody>
              <tr>
                <td>
                  {" "}
                  <input
                    value={name}
                    name="name"
                    onChange={changeName}
                    placeholder="Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <input
                    value={imageUrl}
                    name="imageUrl"
                    onChange={changeUrl}
                    placeholder="ImageUrl"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <input
                    value={address}
                    name="address"
                    onChange={changeAddress}
                    placeholder="Address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value={description}
                    name="description"
                    onChange={changeDescription}
                    placeholder="Description"
                  />
                </td>
              </tr>
              <button>ADD NEW CAMPUS</button>
            </tbody>
          </table>
        </form>
      </>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    addCampus: (campus) => {
      dispatch(_addCampus(campus, history));
    },
  };
};

export default connect(null, mapDispatch)(CampusForm);

// { <>
//   <form onSubmit={onSubmit}>
//     <label>NAME:</label>

//     <input type="text" name="name" onChange={changeName} />

//     <label>IMAGE:</label>

//     <input type="text" name="imageUrl" onChange={changeUrl} />

//     <label>ADDRESS:</label>
//     <input value={address} name="address" onChange={changeAddress} />

//     <label>DESCRIPTION:</label>
// <input
//   value={description}
//   name="description"
//   onChange={changeDescription}
// />
//     <button>CREATE </button>
//   </form>
// </>}
