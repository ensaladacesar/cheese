import {
  GET_JUKEBOX,
  // GET_JUKEBOX_TEXT,
  SELECT_CHEESE,
  GET_JUKEBOX_RESULT,
} from "../types";
import { wpClient } from "../config/axios";

// obtener portadas y textos
export function getJukeboxAction(lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/jukebox/jukebox_tr/jukebox_${lang}.json`
        );
        dispacth(getJukeboxSuccess(res.data));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/jukebox/jukebox_${lang}.php`);
        // console.log(res.data);
        dispacth(getJukeboxSuccess(res.data));
      }
      if (!translate) {
        const res = await wpClient.get(`/jukebox/jukebox_${lang}.php`);
        // console.log(res.data);
        dispacth(getJukeboxSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getJukeboxSuccess = (jukebox) => ({
  type: GET_JUKEBOX,
  payload: jukebox,
});
// const getJukeboxTextSuccess = (texts) => ({
//   type: GET_JUKEBOX_TEXT,
//   payload: texts,
// });
export function selectCheeseAction(cheese) {
  return (dispatch) => {
    dispatch(selectCheese(cheese));
  };
}
const selectCheese = (cheese) => ({
  type: SELECT_CHEESE,
  payload: cheese,
});
export function getJukeResultAction(lang, nameid, translate, transIndex) {
  return async (dispacth) => {
    console.log(`nameid : ${nameid}
                translate : ${translate}
                transIndex : ${transIndex}              
    `);
    let str = nameid;
    let name = str.replace(/_eng|_ch|_esp|_gcc|_hk|_tw|_jp|_sk|_tr/g, "");
    
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/jukebox_results/jukebox_results_tr/${name}_${lang}.json`
        );
        // console.log(res);
        dispacth(getJukeresultSuccess(res.data.jukeboxResult));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/jukebox_results/${name}_${lang}.php`);
        // const res = await wpClient.get(`/jukebox_results/${nameid}_${lang}.php`);
        // console.log(res.data.jukeboxResult);
        dispacth(getJukeresultSuccess(res.data.jukeboxResult));
      }
      if (!translate && transIndex === null) {
        const res = await wpClient.get(`/jukebox_results/${name}_${lang}.php`);
        // const res = await wpClient.get(`/jukebox_results/${nameid}_${lang}.php`);
        // console.log(res.data.jukeboxResult);
        dispacth(getJukeresultSuccess(res.data.jukeboxResult));
      }

      // const res = await wpClient.get(`/jukebox_results/${nameid}.php`);
      // // const res = await wpClient.get(`/jukebox_results/${nameid}_${lang}.php`);
      // // console.log(res.data.jukeboxResult);
      // dispacth(getJukeresultSuccess(res.data.jukeboxResult));
    } catch (error) {
      console.log(error);
    }
  };
}
const getJukeresultSuccess = (result) => ({
  type: GET_JUKEBOX_RESULT,
  payload: result,
});
