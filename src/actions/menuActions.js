import {
  GET_MENU,
  OPEN_MENU,
  CLOSE_MENU,
  MENU_VISIBLE,
  GET_FOOTER,
} from "../types";
import { wpClient } from "../config/axios";

export function getMenuAction(lang, translate, transIndex) {
  return async (dispacth) => {
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(`/menu/menu_tr/menu_${lang}.json`);
        // console.log(res.data);
        dispacth(getMenuSuccess(res.data.menu));
        dispacth(getFooterSuccess(res.data.footer[0]));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/menu/menu_${lang}.php`);
        // console.log(res.data);
        dispacth(getMenuSuccess(res.data.menu));
        dispacth(getFooterSuccess(res.data.footer[0]));
      }
      if (!translate) {
        const res = await wpClient.get(`/menu/menu_${lang}.php`);
        // console.log(res.data);
        dispacth(getMenuSuccess(res.data.menu));
        dispacth(getFooterSuccess(res.data.footer[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getMenuSuccess = (menu) => ({
  type: GET_MENU,
  payload: menu,
});
const getFooterSuccess = (footer) => ({
  type: GET_FOOTER,
  payload: footer,
});

// abrir menu
export function openMenuAction() {
  return (dispatch) => {
    dispatch(openMenu());
  };
}
const openMenu = () => ({
  type: OPEN_MENU,
  payload: true,
});
export function closeMenuAction() {
  return (dispatch) => {
    // console.log('cerrar menu');
    dispatch(closeMenu());
  };
}
const closeMenu = () => ({
  type: CLOSE_MENU,
  payload: false,
});
export function visibleMenuAction(toggle) {
  return (dispatch) => {
    dispatch(visibleMenu(toggle));
  };
}
const visibleMenu = (toggle) => ({
  type: MENU_VISIBLE,
  payload: toggle,
});
