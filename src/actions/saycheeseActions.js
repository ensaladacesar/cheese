import { GET_SAY_CHEESE } from "../types";
import { wpClient } from "../config/axios";

// seleccion de idioma
export function getSayCheeseAction(lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(`/say_cheese/say_cheese_tr/say_cheese_${lang}.json`);
      // console.log(res.data.saycheese);
      dispacth(getSayCheeseSuccess(res.data.saycheese));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/say_cheese/say_cheese_${lang}.php`);
      // console.log(res.data.saycheese);
      dispacth(getSayCheeseSuccess(res.data.saycheese));
      }
      if (!translate) {
        const res = await wpClient.get(`/say_cheese/say_cheese_${lang}.php`);
      // console.log(res.data.saycheese);
      dispacth(getSayCheeseSuccess(res.data.saycheese));
      }
      
    } catch (error) {
      console.log(error);
    }
  };
}
const getSayCheeseSuccess = (say) => ({
  type: GET_SAY_CHEESE,
  payload: say
});
