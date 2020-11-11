import axios from "axios";

//const URl = "http://localhost:4000/";
const wpCheese = "https://www.usacheeseexperience.com/usacheese-wp/jsonusa/";
const wpQuiz = 'https://usacheeseexperience.com/quiz/'

/*
export const clienteAxios = axios.create({
  baseURL: URl,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});
*/

export const wpClient = axios.create({
  baseURL: wpCheese
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // }
});

export const wpPost = axios.create({
  baseURL: wpQuiz
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // }
});
