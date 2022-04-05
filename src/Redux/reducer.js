const initState = {
  name: "",
  email: "",
  username: "",
  isAuthenticated: false,
  isDoctor: false,
  phoneno: "",
  education: "",
  speciality: "",
  accessToken: "",
  appoints: 0,
};
export function reducer(state = initState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        username: action.payload.username,
        isAuthenticated: action.payload.isAuthenticated,
        phoneno: action.payload.phoneno,
        isDoctor: false,
        accessToken: action.payload.accessToken,
      };
    case "LOG_IN_DOCTOR":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        username: action.payload.username,
        isDoctor: action.payload.isDoctor,
        phoneno: action.payload.phoneno,
        education: action.payload.education,
        speciality: action.payload.speciality,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phoneno: action.payload.phoneno,
      };
    case "UPDATE_DOCTOR":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phoneno: action.payload.phoneno,
        education: action.payload.education,
        speciality: action.payload.speciality,
      };
    case "APPOINT":
      return {
        ...state,
        appoints: action.payload.appoints,
      };

    case "LOG_OUT":
      return {
        ...initState,
      };

    default:
      return { ...state };
  }
}
