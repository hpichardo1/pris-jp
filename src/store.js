import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = {
  campuses: [],
  students: [],
};

//------- action creators

export function loadCampuses(campus) {
  return {
    type: "LOAD_CAMPUSES",
    payload: campus,
  };
}

export function loadStudents(student) {
  return {
    type: "LOAD_STUDENTS",
    payload: student,
  };
}

//-------thunks

export const _loadCampuses = () => {
  return async (dispatch) => {
    const campus = (await axios.get("/api/campuses")).data;
    dispatch(loadCampuses(campus));
  };
};

export const _loadStudents = () => {
  return async (dispatch) => {
    const student = (await axios.get("/api/students")).data;
    dispatch(loadStudents(student));
  };
};

//----------reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CAMPUSES":
      return {
        ...state,
        campuses: action.payload,
      };
    case "LOAD_STUDENTS":
      return {
        ...state,
        students: action.payload,
      };
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
