import { GET_ALLRECIPES, GET_RECIPE } from "../types";
import { wpClient } from "../config/axios";

// seleccion de idioma
export function getAllRecipesAction(lang, translate, transIndex) {
  return async (dispacth) => {
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/all_recipies/all_recipies_tr/all_recipies_${lang}.json`
        );
        dispacth(getRecipesSuccess(res.data));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(
          `/all_recipies/all_recipies_${lang}.php`
        );
        dispacth(getRecipesSuccess(res.data));
      }
      if (!translate) {
        const res = await wpClient.get(
          `/all_recipies/all_recipies_${lang}.php`
        );
        // console.log(res.data);
        dispacth(getRecipesSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getRecipesSuccess = (allRecipes) => ({
  type: GET_ALLRECIPES,
  payload: allRecipes,
});

export function getRecipeAction(lang, recipeid, translate, transIndex) {
  return async (dispacth) => {
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/all_recipies/${lang}/recipie_${recipeid}.json`
        );
        dispacth(getRecipeSuccess(res.data));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(
          `/all_recipies/${lang}/recipie_${recipeid}.php`
        );
        dispacth(getRecipeSuccess(res.data));
      }
      if (!translate) {
        const res = await wpClient.get(
          `/all_recipies/${lang}/recipie_${recipeid}.php`
        );
        // console.log('receta',res.data);
        dispacth(getRecipeSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
const getRecipeSuccess = (recipe) => ({
  type: GET_RECIPE,
  payload: recipe,
});
