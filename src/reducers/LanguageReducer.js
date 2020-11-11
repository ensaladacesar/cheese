import {
  GET_LANGUAGES,
  GET_TEXT_LANG,
  CHANGE_LANGUAGE,
  CHANGE_COUNTRY,
  GET_TEXT_INTRO,
  TRANSLATE,
  TRANSLATE_INDEX,
} from "../types";

const initialState = {
  languages: [],
  langtext: {},
  intro: [],
  country: "USA",
  pagelanguage: "eng",
  error: null,
  loading: true,
  translate: false,
  translateindex: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LANGUAGES:
      return {
        ...state,
        error: null,
        languages: action.payload,
        loading: false,
      };
    case GET_TEXT_LANG:
      return {
        ...state,
        langtext: action.payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        pagelanguage: action.payload,
      };
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case GET_TEXT_INTRO:
      return {
        ...state,
        intro: action.payload,
        loading: false,
      };
    case TRANSLATE:
      return {
        ...state,
        translate: action.payload,
      };
    case TRANSLATE_INDEX:
      return {
        ...state,
        translateindex: action.payload,
      };
    default:
      return state;
  }
}
