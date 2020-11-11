import { GET_LOVERS, GET_BUY, CLOSE_BUY } from "../types";

const initialState = {
  lovers: {},
  error: null,
  loading: true,
  buy: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOVERS:
      return {
        ...state,
        error: null,
        lovers: action.payload,
        loading: false,
      };
    case GET_BUY:
      return {
        ...state,
        loading: false,
        buy: action.payload,
      };
    case CLOSE_BUY:
      return {
        ...state,
        loading: false,
        buy: action.payload,
      };

    default:
      return state;
  }
}
