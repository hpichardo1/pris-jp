import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = {
  campuses: [],
  students: [],
  singleStudent: {},
  singleCampus: {},
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

export function loadSingleStudent(student) {
  return {
    type: "LOAD_SINGLE_STUDENT",
    payload: student,
  };
}

export function loadSingleCampus(campus) {
  return {
    type: "LOAD_SINGLE_CAMPUS",
    payload: campus,
  };
}

export function deleteCampus(id) {
  return {
    type: "DELETE_CAMPUS",
    payload: id,
  };
}

export function deleteStudent(id) {
  return {
    type: "DELETE_CAMPUS",
    payload: id,
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

//-- thunks for loading single student & campus
export const _loadSingleStudent = (id) => {
  return async (dispatch) => {
    const singleStudent = (await axios.get(`/api/students/${id}`)).data;
    dispatch(loadSingleStudent(singleStudent));
  };
};

export const _loadSingleCampus = (id) => {
  return async (dispatch) => {
    const singleCampus = (await axios.get(`/api/campuses/${id}`)).data;
    dispatch(loadSingleCampus(singleCampus));
  };
};

export const _deleteCampus = (id) => {
  return async (dispatch) => {
    const campus = await axios.delete(`/api/campuses/delete/${id}`);
    dispatch(deleteCampus(campus));
  };
};

export const _deleteStudent = (id) => {
  return async (dispatch) => {
    const student = await axios.delete(`/api/students/delete/${id}`);
    dispatch(deleteStudent(student));
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
    case "LOAD_SINGLE_STUDENT":
      return {
        ...state,
        singleStudent: action.payload,
      };
    case "LOAD_SINGLE_CAMPUS":
      return {
        ...state,
        singleCampus: action.payload,
      };

    case "DELETE_CAMPUS":
      console.log("AHHHHHHH", action.payload);
      state = {
        ...state,
        campuses: state.campuses.filter((campus) => {
          return campus.id !== action.payload;
        }),
      };
    case "DELETE_STUDENT":
      state = {
        ...state,
        students: state.students.filter((student) => {
          return student.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
