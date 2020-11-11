import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TitleMatchmaker from "../img/title_matchmaker.svg";
import HelmetMetaData from "./common/HelmetMetaData";
import { getQuizAction, getQuizServiceAction } from "../actions/quizActions";
import Sign from "./common/Sign";
import { motion } from "framer-motion";
import Border from "../img/quiz_border.svg";
import AnswerBG from "../img/quiz_answer.svg";
import Server from "../img/quiz_server.svg";
import Loading from "./common/Loading";

const containerQ = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemQ = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const QuizPage = () => {
  const dispatch = useDispatch();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);
  const pageCountry = useSelector((state) => state.Languages.country);
  const history = useHistory();
  const loading = useSelector((state) => state.Quiz.loading);

  //console.log("------ pageCountry:", pageCountry);

  const _webserviceNameArray = [
    "brie",
    "provolone",
    "cream_cheese",
    "mascarpone",
    "muenster",
    "parmesan",
    "pepper_jack",
    "cheddar",
    "colby",
    "gouda",
    "monterrey_jack",
    "mozzarella",
    "blue_cheese",
    "ricotta",
    "swiss",
  ];
  
  const _myResultArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const _highestValueArray = [];
  // const _answersArray = [2,3,0,4,4]; //Cream Cheese

  useEffect(() => {
    const loadQuiz = () => dispatch(getQuizAction(pageLang, translate, transIndex));
    loadQuiz();
    //eslint-disable-next-line
  }, []);

  const quiz = useSelector((state) => state.Quiz.quiz);
  const { generalQuiz, button, header_text, subtitle1 } = quiz;

  const [quizResult, setQuizResult] = useState([]);
  const [cont, setCont] = useState({ inc: 1 });
  const { inc } = cont;
  const [intro, setIntro] = useState(true);

  if (generalQuiz === undefined) return null;

  const readAnswersArray = (quizS) => {

    console.log("------------- quizS:", quizS);

    //-------------------------------------------- ANSWER 1
    switch (quizS[0]) {
      case 0:{
        _myResultArray[0] += 2;
        _myResultArray[9] += 2;
        _myResultArray[13] += 1;
        _myResultArray[11] += 1;

        break;}
      case 1:{
        _myResultArray[1] += 2;
        _myResultArray[14] += 2;
        _myResultArray[6] += 1;
        _myResultArray[13] += 1;
        break;}
      case 2:{ 
        _myResultArray[10] += 2;
        _myResultArray[5] += 2;
        _myResultArray[3] += 1;
        break;}
      case 3:{
        _myResultArray[7] += 2;
        _myResultArray[2] += 2;
        _myResultArray[1] += 1;
        _myResultArray[0] += 1;
        break;}
      case 4:{
        _myResultArray[4] += 2;
        _myResultArray[12] += 2;
        _myResultArray[8] += 2;
        _myResultArray[14] += 1;
        break;}
        default: { break; }
    } //switch

    //-------------------------------------------- ANSWER 2
    switch (quizS[1]) {
      case 0:{
        _myResultArray[7] += 2;
        _myResultArray[11] += 2;
        _myResultArray[12] += 1;
        _myResultArray[4] += 1;
        break;}
      case 1:{
        _myResultArray[9] += 2;
        _myResultArray[13] += 2;
        _myResultArray[0] += 1;
        _myResultArray[1] += 1;
        break;}
      case 2:{
        _myResultArray[2] += 2;
        _myResultArray[0] += 2;
        _myResultArray[3] += 1;
        _myResultArray[11] += 1;
        break;}
      case 3:{
        _myResultArray[8] += 2;
        _myResultArray[5] += 2;
        _myResultArray[10] += 1;
        _myResultArray[6] += 1;
        break;}
      case 4:{
        _myResultArray[14] += 2;
        _myResultArray[1] += 1;
        _myResultArray[3] += 1;
        _myResultArray[5] += 1;
        break;}
      default: { break; }
    } //switch

    //-------------------------------------------- ANSWER 3
    switch (quizS[2]) {
      case 0:{
        _myResultArray[2] += 2;
        _myResultArray[7] += 2;
        _myResultArray[1] += 1;
        _myResultArray[3] += 1;
        _myResultArray[11] += 1;
        break;}
      case 1:{
        _myResultArray[11] += 2;
        _myResultArray[5] += 2;
        _myResultArray[0] += 1;
        break;}
      case 2:{
        _myResultArray[12] += 2;
        _myResultArray[4] += 2;
        _myResultArray[8] += 1;
        break;}
      case 3:{
        _myResultArray[0] += 2;
        _myResultArray[9] += 1;
        _myResultArray[10] += 1;
        _myResultArray[13] += 1;
        break;}
      case 4:{
        _myResultArray[8] += 2;
        _myResultArray[6] += 2;
        _myResultArray[1] += 1;
        _myResultArray[3] += 1;
        break;}
      default: { break; }
    } //switch

    //-------------------------------------------- ANSWER 4
    switch (quizS[3]) {
      case 0:{
        _myResultArray[2] += 2;
        _myResultArray[11] += 2;
        _myResultArray[3] += 1;
        _myResultArray[13] += 1;
        break;}
      case 1:{
        _myResultArray[9] += 2;
        _myResultArray[1] += 2;
        _myResultArray[5] += 1;
        _myResultArray[10] += 1;
        break;}
      case 2:{
        _myResultArray[12] += 2;
        _myResultArray[1] += 2;
        _myResultArray[4] += 1;
        _myResultArray[14] += 1;
        break;}
      case 3:{
        _myResultArray[5] += 2;
        _myResultArray[14] += 1;
        _myResultArray[11] += 1;
        _myResultArray[0] += 1;
        break;}
      case 4:{
        _myResultArray[6] += 2;
        _myResultArray[8] += 2;
        _myResultArray[12] += 1;
        _myResultArray[4] += 1;
        break;}
        default: { break; }
    } //switch

    //-------------------------------------------- ANSWER 5
    switch (quizS[4]) {
      case 0:{
        _myResultArray[12] += 2;
        _myResultArray[0] += 2;
        _myResultArray[1] += 1;
        break;}
      case 1:{
        _myResultArray[6] += 2;
        _myResultArray[10] += 2;
        _myResultArray[8] += 1;
        _myResultArray[4] += 1;
        break;}
      case 2:{
        _myResultArray[11] += 2;
        _myResultArray[14] += 2;
        _myResultArray[13] += 1;
        _myResultArray[1] += 1;
        break;}
      case 3:{
        _myResultArray[9] += 2;
        _myResultArray[5] += 1;
        _myResultArray[4] += 1;
        _myResultArray[7] += 1;
        break;}
      case 4:{
        _myResultArray[3] += 2;
        _myResultArray[2] += 2;
        _myResultArray[13] += 1;
        _myResultArray[11] += 1;
        break;}
      default: { break; }
    } //switch

    getHighestValue();
  };

  const getHighestValue = () => {
    const __maxValue = Math.max.apply(null, _myResultArray);

    console.log("------ _myResultArray:", _myResultArray);
    
   for(let i = 0; i < _myResultArray.length; i++){
        if(_myResultArray[i] === __maxValue){
            console.log("--------- highest value index:", i);
            _highestValueArray.push(i);
        }//if
    }//for


    console.log("------ _highestValueArray:", _highestValueArray);
    console.log("random number:", Math.floor(Math.random() * _highestValueArray.length) );

    console.log("Webservice:", _webserviceNameArray[_highestValueArray[ Math.floor(Math.random() * _highestValueArray.length) ]]);
    dispatch(getQuizServiceAction(_webserviceNameArray[_highestValueArray[0]]));
    history.push("/quizresult");
  };

  const saveAnswer = (a) => {
    setQuizResult([...quizResult, a]);

    setCont({
      ...cont,
      inc: cont.inc + 1,
    });
  };
  if (inc === 6) {
    // console.log("si es igual", quizResult);
    readAnswersArray(quizResult);
    // dispatch(getQuizSaveAction(quizResult));
    // history.push("/quizresult");
  }
  // bienvenida
  const QuizIntro = () => {
    return (
      <Row className="no-gutters align-items-center h-100">
        <Col>
          <img
            src={TitleMatchmaker}
            className="img-fluid quiz_titleSvg"
            alt="Take the Cheese Matchmaker"
          />
          <p className="general__subtitle dark pl-5">{subtitle1}</p>
        </Col>
      </Row>
    );
  };
  // quiz
  const QuizQuestion = ({ quiz }) => {
    const { question, answers } = quiz;

    return (
      <Fragment>
        <motion.div
          className="col-9 offset-2 quiz__question d-flex align-items-center justify-content-center col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
        >
          {/* <p>{questionNum}</p> */}
          <p className="quiz__textQ">{question}</p>
          <img src={Border} className="img-fluid" alt="border" />
        </motion.div>

        <Col className="col-9 offset-2 mt-md-4 my-lg-2 quiz__listContainer">
          <motion.div variants={containerQ} initial="hidden" animate="show">
            <ListGroup>
              {answers.map((answer, index) => (
                <motion.div key={index} variants={itemQ}>
                  <ListGroup.Item
                    action
                    // onClick={() => saveAnswer(answer, parseInt(questionNum))}
                    onClick={() => saveAnswer(index)}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <p>{answer}</p>
                    <img
                      src={AnswerBG}
                      className="img-fluid quiz__bgAnswer"
                      alt="border"
                    />
                  </ListGroup.Item>
                </motion.div>
              ))}
            </ListGroup>
          </motion.div>
        </Col>
      </Fragment>
    );
  };

  // const quizSelect = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Fragment>
      <HelmetMetaData title={`Quiz-${pageCountry}`} />
      {loading ? <Loading /> : null}
      <Container
        fluid
        className="p-0 quiz__main animate__animated animate__fadeIn"
      >
        {intro ? (
          <Row className="no-gutters justify-content-center">
            <Col lg="6" className="quiz__header text-center">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
              >
                <Sign signText={header_text} sClass={true} />
              </motion.div>
            </Col>
          </Row>
        ) : null}
        <Row
          className={`no-gutters justify-content-center ${
            intro ? "" : "align-items-center h-100 d-flex"
          }`}
        >
          <Col
            className="quiz__intro text-center col-10 d-flex align-items-center justify-content-center"
            lg="5"
          >
            <motion.div layout>
              {intro && (
                <motion.div
                  layout
                  className={`quiz__preguntas col-12 ${intro ? "h-100" : ""}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
                >
                  <QuizIntro />
                </motion.div>
              )}
            </motion.div>

            <motion.div layout>
              {!intro && (
                <motion.div
                  className="quiz__preguntas col-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeIn", duration: 0.5 }}
                >
                  <Row className="no-gutters quiz__tabs_container">
                    <Col className="col-7 col-md-6 col-xl-5 offset-4">
                      <Row className="row-cols-5 quiz__tabs nu-gutters">
                        {generalQuiz.map((answer, index) => (
                          <Col
                            key={index}
                            className={`animate__animated ${
                              parseInt(answer.questionNum) === inc
                                ? "quiz__tab_active animate__fadeIn"
                                : ""
                            }`}
                          >
                            {answer.questionNum}
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Row className="no-gutters justify-content-center quiz__quiz">
                    {generalQuiz.map((quiz, index) => {
                      return parseInt(quiz.questionNum) === inc ? (
                        <QuizQuestion quiz={quiz} key={index} />
                      ) : null;
                    })}
                  </Row>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="quiz__server"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
            >
              <img src={Server} className="img-fluid" alt="Server" />
            </motion.div>
          </Col>
          {intro ? (
            <Fragment>
              <div className={`w-100 d-none d-md-block my-4 my-2`}></div>
              <Col lg="3" className="text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeIn", duration: 0.5, delay: 1.3 }}
                >
                  <button
                    className="btn general__fill__button"
                    onClick={() => setIntro(false)}
                  >
                    {button}
                  </button>
                </motion.div>
              </Col>
            </Fragment>
          ) : null}
        </Row>
      </Container>
    </Fragment>
  );
};

export default QuizPage;
