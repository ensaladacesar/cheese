import { GET_LOVERS, GET_BUY, CLOSE_BUY } from "../types";
import { wpClient } from "../config/axios";

// seleccion de idioma
export function getLoversAction(lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/say_lovers/say_lovers_tr/say_lovers_${lang}.json`
        );
        dispacth(getLoversSuccess(res.data.lovers));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/say_lovers/say_lovers_${lang}.php`);
        dispacth(getLoversSuccess(res.data.lovers));
      }
      if (!translate) {
        const res = await wpClient.get(`/say_lovers/say_lovers_${lang}.php`);
        dispacth(getLoversSuccess(res.data.lovers));
      }

      //  const res = await clienteAxios.get(`/say_lovers_${lang}`);
      //  // console.log(res.data);
      //  dispacth( getLoversSuccess(res.data.lovers));
    } catch (error) {
      console.log(error);
    }
  };
}
const getLoversSuccess = (story) => ({
  type: GET_LOVERS,
  payload: story,
});
export function getBuyAction() {
  return async (dispacth) => {
    dispacth(getBuy());
  };
}
const getBuy = () => ({
  type: GET_BUY,
  payload: true,
});
export function closeBuyAction() {
  return async (dispacth) => {
    dispacth(closeBuy());
  };
}
const closeBuy = () => ({
  type: CLOSE_BUY,
  payload: false,
});
