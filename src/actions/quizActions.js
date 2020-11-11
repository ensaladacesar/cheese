import {
  GET_QUIZ,
  GET_SAVE_QUIZ,
  GET_QUIZ_RESULT,
  QUIZ_SERVICE,
  POST_QUIZ,
} from "../types";
import { wpClient, wpPost } from "../config/axios";

// seleccion de idioma
export function getQuizAction(lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log('obtener todas las recetas');
    try {
      if (translate && transIndex === 1) {
        const res = await wpClient.get(`/quiz/quiz_tr/quiz_${lang}.json`);
      //  console.log(res.data);
      dispacth(getQuizSuccess(res.data));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(`/quiz/quiz_${lang}.php`);
      //  console.log(res.data);
      dispacth(getQuizSuccess(res.data));
      }
      if (!translate) {
        const res = await wpClient.get(`/quiz/quiz_${lang}.php`);
      //  console.log(res.data);
      dispacth(getQuizSuccess(res.data));
      }     
      //  const res = await clienteAxios.get(`/quiz_${lang}`);
      // //  console.log(res.data);
      //  dispacth( getQuizSuccess(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}
const getQuizSuccess = (quiz) => ({
  type: GET_QUIZ,
  payload: quiz,
});

export function getQuizSaveAction(save) {
  return async (dispacth) => {
    try {
      dispacth(getQuizSaveSuccess(save));
    } catch (error) {
      console.log(error);
    }
  };
}
const getQuizSaveSuccess = (quizsave) => ({
  type: GET_SAVE_QUIZ,
  payload: quizsave,
});

export function getQuizResultAction(cheese, lang, translate, transIndex) {
  return async (dispacth) => {
    // console.log("obtener liga de quiz", cheese, lang);
    try {

      if (translate && transIndex === 1) {
        const res = await wpClient.get(
          `/quiz_results/quiz_results_tr/quiz_result_${cheese}_${lang}.json`
        );
        dispacth(getQuizResultSuccess(res.data.quizResult));
      }
      if (translate && transIndex === 0) {
        const res = await wpClient.get(
          `/quiz_results/quiz_result_${cheese}_${lang}.php`
        );
        dispacth(getQuizResultSuccess(res.data.quizResult));
      }
      if (!translate) {
        const res = await wpClient.get(
          `/quiz_results/quiz_result_${cheese}_${lang}.php`
        );
        dispacth(getQuizResultSuccess(res.data.quizResult));
      }      
      //     const res = await clienteAxios.get(`/quiz_result_${lang}`);
      //    //  console.log(res.data);
      //     dispacth( getQuizResultSuccess(res.data.quizResult));
    } catch (error) {
      console.log(error);
    }
  };
}
const getQuizResultSuccess = (quizresult) => ({
  type: GET_QUIZ_RESULT,
  payload: quizresult,
});

export function getQuizServiceAction(service) {
  return (dispacth) => {
    dispacth(getQuizServiceSuccess(service));
  };
}

const getQuizServiceSuccess = (quizservice) => ({
  type: QUIZ_SERVICE,
  payload: quizservice,
});

export function postQuizAction(postData) {
  return async (dispacth) => {
    try {
      await wpPost.post(`/save_quiz.php`, postData);
      dispacth(postQuiz(postData));
    } catch (error) {
      console.log(error);
    }
  };
}
const postQuiz = (postData) => ({
  type: POST_QUIZ,
  payload: postData,
});

// export function postQuizResultAction(postData) {
//   return async (dispacth) => {
//     try {
//       //usacheeseexperience.com/quiz/results_quiz.php
//       http: await wpPost.post(`/results_quiz.php`, postData);
//       dispacth(postQuizResult(postData));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
// const postQuizResult = (postData) => ({
//   type: POST_QUIZ,
//   payload: postData,
// });
