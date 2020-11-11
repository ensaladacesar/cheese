import { GET_STORY, GET_ABOUT, CLOSE_ABOUT } from "../types";

const initialState = {
  story: {},
  error: null,
  loading: true,
  about: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORY:
      return {
        ...state,
        error: null,
        story: action.payload,
        loading: false,
      };
    case GET_ABOUT:
      return {
        ...state,
        loading: false,
        about: action.payload,
      };
    case CLOSE_ABOUT:
      return {
        ...state,
        loading: false,
        about: action.payload,
      };

    default:
      return state;
  }
}
