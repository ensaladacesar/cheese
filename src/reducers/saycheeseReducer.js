import { GET_SAY_CHEESE } from "../types";

const initialState = {
  saycheese: {},
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SAY_CHEESE:
      return {
        ...state,
        error: null,
        saycheese: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
