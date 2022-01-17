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
    type: "DELETE_STUDENT",
    payload: id,
  };
}

export function addCampus(campus) {
  return {
    type: "ADD_CAMPUS",
    payload: campus,
  };
}

export function addStudent(student) {
  return {
    type: "ADD_STUDENT",
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

//---- delete thunks
export const _deleteCampus = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${id}`);
    dispatch(deleteCampus(id));
  };
};

export const _deleteStudent = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${id}`);
    dispatch(deleteStudent(id));
  };
};

//-------- form thunks

export const _addCampus = (campus, history) => {
  return async (dispatch) => {
    const newCampus = await axios.post("/api/campuses", campus).data;
    dispatch(addCampus(newCampus));
    // history.push("/campuses");
  };
};

export const _addStudents = (student, history) => {
  return async (dispatch) => {
    const newStudent = (await axios.post("/api/students", student)).data;
    dispatch(addStudent(newStudent));
    //history.push("/students");
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
      return {
        ...state,
        campuses: state.campuses.filter((campus) => {
          return campus.id !== action.payload;
        }),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((student) => {
          return student.id !== action.payload;
        }),
      };
    case "ADD_CAMPUS":
      return {
        ...state,
        campuses: [...state.campuses, action.payload],
      };
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
