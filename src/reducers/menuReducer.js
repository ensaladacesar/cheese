import {
  GET_MENU,
  OPEN_MENU,
  CLOSE_MENU,
  MENU_VISIBLE,
  GET_FOOTER
} from "../types";

const initialState = {
  mainmenu: {},
  footer:{},
  openmenu: false,
  error: null,
  loading: false,
  menuvisible: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MENU:
      return {
        ...state,
        openmenu: action.payload,
      };
    case CLOSE_MENU:
      return {
        ...state,
        openmenu: action.payload,
      };
    case MENU_VISIBLE:
      return {
        ...state,
        menuvisible: action.payload,
      };
    case GET_MENU:
      return {
        ...state,
        mainmenu: action.payload
      };
      case GET_FOOTER:
        return{
          ...state,
          footer: action.payload
        }    
    default:
      return state;
  }
}
