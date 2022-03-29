const initState = {
    name: "",
    email: "",
    username:"",
    isAuthenticated: false,
    isDoctor:false,
    isAdmin:false,
    phoneno:"",
    education:"",
    speciality:"",
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
          phoneno:action.payload.phoneno,
          isAdmin:false,
        };
        case "LOG_IN_DOCTOR":
          return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
            username: action.payload.username,
            isDoctor: action.payload.isDoctor,
            phoneno:action.payload.phoneno,
            education:action.payload.education,
            speciality:action.payload.speciality,
            isAdmin:false,
          };
        case "ADMIN":
          return {
            ...state,
            name: action.payload.name,
          email: action.payload.email,
          username: action.payload.username,
          isAuthenticated: action.payload.isAuthenticated,
          phoneno:action.payload.phoneno,
          isAdmin:true,
          };
       
      case "LOG_OUT":
        return {
          ...initState,
        };
  
      default:
        return { ...state };
    }
  }