import { GET_STORY, GET_ABOUT, CLOSE_ABOUT } from "../types";
import { wpClient } from "../config/axios";

// seleccion de idioma
export function getStoryAction(lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(`/story/story_tr/story_${lang}.json`);
        // console.log(res.data.story);
        dispacth(getStorySuccess(res.data.story));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/story/story_${lang}.php`);
        // console.log(res.data.story);
        dispacth(getStorySuccess(res.data.story));
      }
      if (!translate) {
        const res = await wpClient.get(`/story/story_${lang}.php`);
        // console.log(res.data.story);
        dispacth(getStorySuccess(res.data.story));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getStorySuccess = (story) => ({
  type: GET_STORY,
  payload: story,
});

export function getAboutAction() {
  return (dispacth) => {
    dispacth(getAbout());
  };
}
const getAbout = () => ({
  type: GET_ABOUT,
  payload: true,
});

export function closeAboutAction() {
  return (dispacth) => {
    dispacth(closeAbout());
  };
}
const closeAbout = () => ({
  type: CLOSE_ABOUT,
  payload: false,
});
