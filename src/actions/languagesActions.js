import {
  GET_LANGUAGES,
  GET_TEXT_LANG,
  CHANGE_LANGUAGE,
  CHANGE_COUNTRY,
  GET_TEXT_INTRO,
  TRANSLATE,
  TRANSLATE_INDEX,
} from "../types";
import { wpClient } from "../config/axios";

// seleccion de idioma
export function getLanguagesAction() {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      // const res = await clienteAxios.get("/languages");
      // dispacth(getLanguagesSuccess(res.data.languages));
      // dispacth(getLangTextSuccess(res.data.texts[0]));
      const res = await wpClient.get("/lenguages/languages.php");
      // console.log(res.data.languages);
      //   console.log(res.data.texts[0]);
      dispacth(getLanguagesSuccess(res.data.languages));
      dispacth(getLangTextSuccess(res.data.texts[0]));
      dispacth(getIntroSuccess(res.data.intro));
    } catch (error) {
      console.log(error);
    }
  };
}
const getLanguagesSuccess = (langs) => ({
  type: GET_LANGUAGES,
  payload: langs,
});

const getLangTextSuccess = (texts) => ({
  type: GET_TEXT_LANG,
  payload: texts,
});
export function getIntroSuccessAction(translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (
        (translate && transIndex === 1) ||
        (translate && transIndex === 0) ||
        !translate
      ) {
        const res = await wpClient.get("/lenguages/languages.php");
        dispacth(getIntroSuccess(res.data.intro));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getIntroSuccess = (texts) => ({
  type: GET_TEXT_INTRO,
  payload: texts,
});
export function changeLangAction(lang) {
  return (dispacth) => {
    // console.log('obtener todas las recetas');
    dispacth(changeLang(lang));  
  };
}
export function changeLangSocialAction(lang) {
  return (dispacth) => {
    // console.log('obtener todas las recetas');
    dispacth(changeLang(lang));  
    dispacth(translateDenied());
    dispacth(translateIndexSuccess(null));  
  };
}
const changeLang = (lang) => ({
  type: CHANGE_LANGUAGE,
  payload: lang,
});
export function changeCountryAction(country) {
  return (dispacth) => {
    // console.log('obtener todas las recetas');
    dispacth(changeCountry(country));
  };
}
const changeCountry = (country) => ({
  type: CHANGE_COUNTRY,
  payload: country,
});
export function translateAction(index) {
  return (dispacth) => {
    // console.log('obtener todas las recetas');
    dispacth(translateSuccess());
    dispacth(translateIndexSuccess(index));
  };
}
const translateSuccess = () => ({
  type: TRANSLATE,
  payload: true,
});
const translateDenied = () => ({
  type: TRANSLATE,
  payload: false,
});
const translateIndexSuccess = (index) => ({
  type: TRANSLATE_INDEX,
  payload: index,
});
