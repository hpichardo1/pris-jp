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

function editCampus(campus) {
  return {
    type: "EDIT_CAMPUS",
    payload: campus,
  };
}

function editStudent(student) {
  return {
    type: "EDIT_STUDENT",
    payload: student,
  };
}

function unregisterId(student) {
  return {
    type: "UNREGISTER_ID",
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
    const newCampus = (await axios.post("/api/campuses", campus)).data;
    dispatch(addCampus(newCampus));
    //history.push("/campuses");
  };
};

export const _addStudents = (student, history) => {
  return async (dispatch) => {
    const newStudent = (await axios.post("/api/students", student)).data;
    dispatch(addStudent(newStudent));
    //history.push("/students");
  };
};

//------- update thunks

export const _editCampus = (id, campus, history) => {
  //console.log("line 152222222222", campus);
  return async (dispatch) => {
    const updateCampus = (await axios.put(`/api/campuses/${id}`, campus)).data;
    dispatch(editCampus(updateCampus));
    //history.push("/campuses");
  };
};

export const _editStudent = (id, student, history) => {
  return async (dispatch) => {
    const updateStudent = (await axios.put(`/api/students/${id}`, student))
      .data;
    dispatch(editStudent(updateStudent));
    history.push("/students");
  };
};

export const _unregisterId = (student) => {
  console.log("STUDENT", student);
  return async (dispatch) => {
    student.campusId = null;
    const updateCampusId = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(unregisterId(updateCampusId));
  };
};
//another thunk editCampusId
//same put route
//student.campusId = null

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
    case "EDIT_CAMPUS":
      return {
        ...state,
        singleCampus: action.payload,
        campuses: state.campuses.map((campus) => {
          // if the current campus.id is the same id we just updates, then return that updated campus
          if (campus.id === action.payload.id) {
            return action.payload;
          }
          return campus;
        }),
      };
    case "EDIT_STUDENT":
      return {
        ...state,
        singleStudent: action.payload,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return action.payload;
          }
          return student;
        }),
      };
    case "UNREGISTER_ID":
      return {
        ...state,
        // singleCampus: state.singleCampus.students.filter((student) => {
        //   return student.id !== action.payload.id;
        // }),

        students: state.students.map((student) => {
          if (student.id !== action.payload.id) {
            return student;
          }
          return action.payload;
        }),
      };

    //case EDIT_CAMPUSID:
    // return state.map((student) => {
    //   if (student.id === action.student.id) {
    //     action.student;
    //   }
    //   return student;
    // });
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
