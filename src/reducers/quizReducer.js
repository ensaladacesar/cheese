import {
  GET_QUIZ,
  GET_SAVE_QUIZ,
  GET_QUIZ_RESULT,
  QUIZ_SERVICE,
  POST_QUIZ,
} from "../types";

const initialState = {
  quiz: {},
  quizsave: {},
  quizresult: {},
  quizservice: "",
  postquiz: {},
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUIZ:
      return {
        ...state,
        error: null,
        quizsave: {},
        quiz: action.payload,
        quizresult: {},
        loading: false,
      };
    case GET_SAVE_QUIZ:
      return {
        ...state,
        quizsave: action.payload,
      };
    case GET_QUIZ_RESULT:
      return {
        ...state,
        quizresult: action.payload,
        loading: false,
      };
    case QUIZ_SERVICE:
      return {
        ...state,
        quizservice: action.payload,
      };
    case POST_QUIZ:
      return {
        ...state,
        postquiz: action.payload,
        error: null,
      };

    default:
      return state;
  }
}
