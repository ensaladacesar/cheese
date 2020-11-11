import { GET_ALLRECIPES, GET_RECIPE } from "../types";

const initialState = {
  allrecipes: [],
  recipe: {},
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALLRECIPES:
      return {
        ...state,
        error: null,
        allrecipes: action.payload,
        recipe: {},
        loading: false,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
