import  UserActionTypes  from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isLoading: false
  };
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UserActionTypes.SIGN_IN_SUCCESS:
      
        return {
          ...state,
          currentUser: action.payload,
          error: null
        };
      case UserActionTypes.SIGN_IN_FAILURE:
        
          return {
            ...state,
            error: action.payload
          }
        case UserActionTypes.SIGN_OUT_SUCCESS:
          return {
            ...state,
            currentUser: null,
            error: null
          }
        case UserActionTypes.SIGN_OUT_FAILURE:
          return {
            ...state,
            error: action.payload
          } 
        case UserActionTypes.SIGN_UP_SUCCESS: 
        return{
          ...state,
          currentUser: action.payload,
          error: null
        }  
        case UserActionTypes.SIGN_UP_FAILURE: 
        return{
          ...state,
          error: action.payload
        }  
        case UserActionTypes.TOGGLE_LOADING:
          return{
            ...state,
            isLoading: !state.isLoading
          } 
        default:
        return state;
    }
  };
  
  export default userReducer;