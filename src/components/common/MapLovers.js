import React, { Fragment, useEffect, useRef } from "react";

import {useSelector} from "react-redux";

import Mapa_Taiwan from "../../img/mapas/Mapa_Taiwan.svg";
import Mapa_Japan from "../../img/mapas/Mapa_Japan.svg";
import Mapa_HongKong from "../../img/mapas/Mapa_HongKong.svg";
import Mapa_GCC from "../../img/mapas/Mapa_GCC.svg";
import Mapa_Mexico from "../../img/mapas/Mapa_Mexico.svg";
import Mapa_SouthKorea from "../../img/mapas/Mapa_SouthKorea.svg";
import Mapa_China from "../../img/mapas/Mapa_China.svg";
import Pointer from "../../img/mapas/Pointer2.svg";


const MapLovers = ({cheese}) => {

  const divMapa = useRef();
  //const pageCountry = useSelector((state) => state.Languages.country);
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  
  useEffect(() => {
    
    const _divWidth = divMapa.current.offsetWidth;
    //const _divHeight = divMapa.current.offsetHeight;
    
    let _pinW = 14;
    let _pinH = 20;

    let _totalPins = 20;
    let _totalPinsPerBox = 0;

    let _arrayLength = 0;

    let _taiwanBoxCoordsX = [287,271,223,171,276,276,236];
    let _taiwanBoxCoordsY = [7,70,142,220,220,322,424];
    let _taiwanBoxW = [110,126,139,104,63,35,34];
    let _taiwanBoxH = [62,71,78,204,102,51,70];

    let _japanBoxCoordsX = [26,96,96,218,284,307,354];
    let _japanBoxCoordsY = [410,396,355,302,254,164,29];
    let _japanBoxW = [58,68,120,66,55,59,93];
    let _japanBoxH = [81,43,40,80,110,90,80];

    let _hongKongBoxCoordsX = [15,64,103,179,213,332,288,251,391];
    let _hongKongBoxCoordsY = [311,204,148,94,148,183,259,335,169];
    let _hongKongBoxW = [138,150,110,215,117,58,94,111,102];
    let _hongKongBoxH = [88,52,55,51,107,76,63,40,69];

    let _gccBoxCoordsX = [60,48,171,75,136,242,348,151];
    let _gccBoxCoordsY = [39,119,102,215,215,215,211,398];
    let _gccBoxW = [79,123,126,58,102,102,115,118];
    let _gccBoxH = [79,95,112,81,183,183,104,62];

    let _mexicoBoxCoordsX = [18,85,70,130,235,189,262,372,437];
    let _mexicoBoxCoordsY = [40,61,156,156,156,259,368,377,307];
    let _mexicoBoxW = [30,125,30,104,79,134,108,58,50];
    let _mexicoBoxH = [109,94,112,100,100,106,59,74,84];
        
    let _southKoreaBoxCoordsX = [154,262,154,262,154,262];
    let _southKoreaBoxCoordsY = [30,30,133,133,238,238];
    let _southKoreaBoxW = [108,88,108,114,108,115];
    let _southKoreaBoxH = [103,103,103,103,123,100];

    let _chinaBoxCoordsX = [60,9,47,186,285,380,204];
    let _chinaBoxCoordsY = [118,189,260,184,163,63,334];
    let _chinaBoxW = [119,175,138,99,94,86,159];
    let _chinaBoxH = [69,71,73,147,172,136,58];

    let _country = "";

    //----------------------------------------------------------//
    //
    // INIT FUNCTION
    //
    //----------------------------------------------------------//

    function init(){
      
      console.log("^-^ INIT");
      
      getTotalPins();
      getCountry();
      getPinSize();
      createArrayPercent();

    }

    init();

    //----------------------------------------------------------//
    //
    // GET TOTAL PINS CONECT TO THE SERVICE
    //
    //----------------------------------------------------------//

    function getTotalPins(){

      _totalPins = 15;

    }

    function getCountry(){

      console.log("GET COUNTRY");

      //HERE YOU PUT IN THIS let THE COUNTRY
      console.log("pageLang: ", pageLang);

      switch(pageLang){
        case "eng": { break; }
        case "tw": { _country = "Taiwan"; break; }
        case "tw_eng": { _country = "Taiwan"; break; }
        case "jp": { _country = "Japan"; break; }
        case "jp_eng": { _country = "Japan"; break; }
        case "hk": { _country = "Hong Kong"; break; }
        case "hk_eng": { _country = "Hong Kong"; break; }
        case "sk": { _country = "South Korea"; break; }
        case "sk_eng": { _country = "South Korea"; break; }
        case "gcc": { _country = "GCC"; break; }
        case "gcc_eng": { _country = "GCC"; break; }
        case "esp": { _country = "Mexico"; break; }
        case "esp_eng": { _country = "Mexico"; break; }
        case "ch": { _country = "Mainland China"; break; }
        case "ch_eng": { _country = "Mainland China"; break; }
        default: { break; }
      }//switch

      switch(_country){
          case "USA": { break; }
          case "Taiwan": {
            _totalPins = 28;
            divMapa.current.style.backgroundImage = `url('${Mapa_Taiwan}')`;
          break; }
          case "Japan": {
            _totalPins = 20;
            divMapa.current.style.backgroundImage = `url('${Mapa_Japan}')`;
          break; }
          case "Hong Kong": {
            _totalPins = 46;
            divMapa.current.style.backgroundImage = `url('${Mapa_HongKong}')`;
          break; }
          case "GCC": { 
            _totalPins = 15;
            divMapa.current.style.backgroundImage = `url('${Mapa_GCC}')`;   
          break; }
          case "Mexico": {
            _totalPins = 20; 
            divMapa.current.style.backgroundImage = `url('${Mapa_Mexico}')`; 
          break; }
          case "South Korea": { 
            _totalPins = 30;
            divMapa.current.style.backgroundImage = `url('${Mapa_SouthKorea}')`; 
          break; }
          case "Mainland China": { 
            _totalPins = 40;
            divMapa.current.style.backgroundImage = `url('${Mapa_China}')`;
          break; }
          default: { break; }
      }//switch

    }

    //----------------------------------------------------------//
    //
    // GET PERCENT %
    //
    //----------------------------------------------------------//

    function getPinSize(){

      if(_divWidth >= 400){
          _pinW = 14;
          _pinH = 20;
      } else if(_divWidth >= 300 && _divWidth < 400){
          _pinW = 10;
          _pinH = 14;
      } else if(_divWidth < 300){
          _pinW = 7;
          _pinH = 10;
      } //else if

    }

    //----------------------------------------------------------//
    //
    // GET PERCENT %
    //
    //----------------------------------------------------------//

    function getPercentageArrays(__pixelsBox, __pixelsDiv){

      let percentage = (__pixelsDiv * __pixelsBox) / 500 ; 
      return percentage;
    }

    function getPercentage(__pixelsBox, __pixelsDiv){

      let percentage = ( __pixelsBox * 100 ) / __pixelsDiv ; 
      return percentage;
    }

    //----------------------------------------------------------//
    //
    // CREATE ARRAY PERCENT L T W & H
    //
    //----------------------------------------------------------//

    function createArrayPercent(){

      //console.log("_divWidth:", _divWidth);

      switch(_country){
          case "USA": { break; }
          case "Taiwan": {
              for(let i = 0; i < _taiwanBoxCoordsX.length; i++){
                  _taiwanBoxCoordsX[i] = getPercentageArrays(_taiwanBoxCoordsX[i], _divWidth);
                  _taiwanBoxCoordsY[i] = getPercentageArrays(_taiwanBoxCoordsY[i], _divWidth);
                  _taiwanBoxW[i] = getPercentageArrays(_taiwanBoxW[i], _divWidth);
                  _taiwanBoxH[i] = getPercentageArrays(_taiwanBoxH[i], _divWidth);
              } //for
          break; }
          case "Japan": {
              for(let i = 0; i < _japanBoxCoordsX.length; i++){
                  _japanBoxCoordsX[i] = getPercentageArrays(_japanBoxCoordsX[i], _divWidth);
                  _japanBoxCoordsY[i] = getPercentageArrays(_japanBoxCoordsY[i], _divWidth);
                  _japanBoxW[i] = getPercentageArrays(_japanBoxW[i], _divWidth);
                  _japanBoxH[i] = getPercentageArrays(_japanBoxH[i], _divWidth);
              } //for
          break; }
          case "Hong Kong": {
              for(let i = 0; i < _hongKongBoxCoordsX.length; i++){
                  _hongKongBoxCoordsX[i] = getPercentageArrays(_hongKongBoxCoordsX[i], _divWidth);
                  _hongKongBoxCoordsY[i] = getPercentageArrays(_hongKongBoxCoordsY[i], _divWidth);
                  _hongKongBoxW[i] = getPercentageArrays(_hongKongBoxW[i], _divWidth);
                  _hongKongBoxH[i] = getPercentageArrays(_hongKongBoxH[i], _divWidth);
              } //for
          break; }
          case "GCC": { 
              for(let i = 0; i < _gccBoxCoordsX.length; i++){
                  _gccBoxCoordsX[i] = getPercentageArrays(_gccBoxCoordsX[i], _divWidth);
                  _gccBoxCoordsY[i] = getPercentageArrays(_gccBoxCoordsY[i], _divWidth);
                  _gccBoxW[i] = getPercentageArrays(_gccBoxW[i], _divWidth);
                  _gccBoxH[i] = getPercentageArrays(_gccBoxH[i], _divWidth);
              } //for    
          break; }
          case "Mexico": { 
              for(let i = 0; i < _mexicoBoxCoordsX.length; i++){
                  _mexicoBoxCoordsX[i] = getPercentageArrays(_mexicoBoxCoordsX[i], _divWidth);
                  _mexicoBoxCoordsY[i] = getPercentageArrays(_mexicoBoxCoordsY[i], _divWidth);
                  _mexicoBoxW[i] = getPercentageArrays(_mexicoBoxW[i], _divWidth);
                  _mexicoBoxH[i] = getPercentageArrays(_mexicoBoxH[i], _divWidth);
              } //for
          break; }
          case "South Korea": { 
              for(let i = 0; i < _southKoreaBoxCoordsX.length; i++){
                  _southKoreaBoxCoordsX[i] = getPercentageArrays(_southKoreaBoxCoordsX[i], _divWidth);
                  _southKoreaBoxCoordsY[i] = getPercentageArrays(_southKoreaBoxCoordsY[i], _divWidth);
                  _southKoreaBoxW[i] = getPercentageArrays(_southKoreaBoxW[i], _divWidth);
                  _southKoreaBoxH[i] = getPercentageArrays(_southKoreaBoxH[i], _divWidth);
              } //for
          break; }
          case "Mainland China": { 
              for(let i = 0; i < _chinaBoxCoordsX.length; i++){
                  _chinaBoxCoordsX[i] = getPercentageArrays(_chinaBoxCoordsX[i], _divWidth);
                  _chinaBoxCoordsY[i] = getPercentageArrays(_chinaBoxCoordsY[i], _divWidth);
                  _chinaBoxW[i] = getPercentageArrays(_chinaBoxW[i], _divWidth);
                  _chinaBoxH[i] = getPercentageArrays(_chinaBoxH[i], _divWidth);
              } //for
          break; }
          default: { break; }
      }//switch

      setCountryAreaBoxes();

    }

    //----------------------------------------------------------//
    //
    // SET TOTAL OF COUNTRY AREA BOXES
    //
    //----------------------------------------------------------//

    function setCountryAreaBoxes(){

        console.log("^-^ COUNTRY AREA");

        //---GET THE ARRAY LENGTH DEPENDING IN WICH COUNTRY ARE SELECTED
        switch(_country){
            case "USA": { break; } 
            case "Taiwan": {         _arrayLength = _taiwanBoxCoordsX.length; break; }
            case "Japan": {          _arrayLength = _japanBoxCoordsX.length; break; }
            case "Hong Kong": {      _arrayLength = _hongKongBoxCoordsX.length; break; }
            case "GCC": {            _arrayLength = _gccBoxCoordsX.length; break; }
            case "Mexico": {         _arrayLength = _mexicoBoxCoordsX.length; break; }
            case "South Korea": {    _arrayLength = _southKoreaBoxCoordsX.length; break; }
            case "Mainland China": { _arrayLength = _chinaBoxCoordsX.length; break; }
            default: { break; }
        }//switch

        console.log("_arrayLength: " + _arrayLength);

        //---CREATE BOXES
        for(let i = 0; i < _arrayLength; i++){

          let _perW = 0;
          let _perH = 0;
          let _perL = 0;
          let _perT = 0;

            switch(_country){
                case "USA": { break; }
                case "Taiwan": {
                     _perW = getPercentage(_taiwanBoxW[i], _divWidth);
                     _perH = getPercentage(_taiwanBoxH[i], _divWidth);
                     _perL = getPercentage(_taiwanBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_taiwanBoxCoordsY[i], _divWidth);
                break; }
                case "Japan": {
                     _perW = getPercentage(_japanBoxW[i], _divWidth);
                     _perH = getPercentage(_japanBoxH[i], _divWidth);
                     _perL = getPercentage(_japanBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_japanBoxCoordsY[i], _divWidth);
                break; }
                case "Hong Kong": { 
                     _perW = getPercentage(_hongKongBoxW[i], _divWidth);
                     _perH = getPercentage(_hongKongBoxH[i], _divWidth);
                     _perL = getPercentage(_hongKongBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_hongKongBoxCoordsY[i], _divWidth);
                break; }
                case "GCC": { 
                     _perW = getPercentage(_gccBoxW[i], _divWidth);
                     _perH = getPercentage(_gccBoxH[i], _divWidth);
                     _perL = getPercentage(_gccBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_gccBoxCoordsY[i], _divWidth);  
                break; }
                case "Mexico": { 
                     _perW = getPercentage(_mexicoBoxW[i], _divWidth);
                     _perH = getPercentage(_mexicoBoxH[i], _divWidth);
                     _perL = getPercentage(_mexicoBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_mexicoBoxCoordsY[i], _divWidth);
                break; }
                case "South Korea": { 
                     _perW = getPercentage(_southKoreaBoxW[i], _divWidth);
                     _perH = getPercentage(_southKoreaBoxH[i], _divWidth);
                     _perL = getPercentage(_southKoreaBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_southKoreaBoxCoordsY[i], _divWidth);
                break; }
                case "Mainland China": { 
                     _perW = getPercentage(_chinaBoxW[i], _divWidth);
                     _perH = getPercentage(_chinaBoxH[i], _divWidth);
                     _perL = getPercentage(_chinaBoxCoordsX[i], _divWidth);
                     _perT = getPercentage(_chinaBoxCoordsY[i], _divWidth);
                break; }
                default: { break; }
            }//switch

            //---CREATE DIV
            let __divBoxArea = document.createElement('div');
            __divBoxArea.setAttribute('id', "divBoxArea"+i);
            //__divBoxArea.style.border = "thin solid #FF0000";
            __divBoxArea.style.position = "absolute";
            __divBoxArea.style.width = _perW + "%";
            __divBoxArea.style.height = _perH + "%";
            __divBoxArea.style.left = _perL + "%";
            __divBoxArea.style.top = _perT + "%";

            divMapa.current.appendChild(__divBoxArea);

        }//for

        createPins();

    }

    //----------------------------------------------------------//
    //
    // SET POINTERS
    //
    //----------------------------------------------------------//

    function getRandomNumber(min, max) {
        
      return Math.random() * (max - min) + min;
        
    }

    function createPins(){
      console.log("^-^ CREATE PINS");

      //--GET TOTAL PINS PER BOX
      _totalPinsPerBox =  Math.floor(_totalPins / _arrayLength);

      for(let i = 0; i < _arrayLength; i++){

          for(let j = 0; j < _totalPinsPerBox; j++){

            let __randomLeft;
            let __randomTop;
            let _perL;
            let _perT;

              switch(_country){
                  case "USA": { break; }
                  case "Taiwan": {
                      __randomLeft = getRandomNumber(0, _taiwanBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _taiwanBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _taiwanBoxW[i]);
                      _perT = getPercentage(__randomTop, _taiwanBoxH[i]);
                  break; }
                  case "Japan": {
                      __randomLeft = getRandomNumber(0, _japanBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _japanBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _japanBoxW[i]);
                      _perT = getPercentage(__randomTop, _japanBoxH[i]);
                  break; }
                  case "Hong Kong": { 
                      __randomLeft = getRandomNumber(0, _hongKongBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _hongKongBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _hongKongBoxW[i]);
                      _perT = getPercentage(__randomTop, _hongKongBoxH[i]);
                  break; }
                  case "GCC": { 
                      __randomLeft = getRandomNumber(0, _gccBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _gccBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _gccBoxW[i]);
                      _perT = getPercentage(__randomTop, _gccBoxH[i]); 
                  break; }
                  case "Mexico": { 
                      __randomLeft = getRandomNumber(0, _mexicoBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _mexicoBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _mexicoBoxW[i]);
                      _perT = getPercentage(__randomTop, _mexicoBoxH[i]);
                  break; }
                  case "South Korea": { 
                      __randomLeft = getRandomNumber(0, _southKoreaBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _southKoreaBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _southKoreaBoxW[i]);
                      _perT = getPercentage(__randomTop, _southKoreaBoxH[i]);
                  break; }
                  case "Mainland China": { 
                      __randomLeft = getRandomNumber(0, _chinaBoxW[i]-_pinW);
                      __randomTop = getRandomNumber(0, _chinaBoxH[i]-_pinH);
                      _perL = getPercentage(__randomLeft, _chinaBoxW[i]);
                      _perT = getPercentage(__randomTop, _chinaBoxH[i]);
                  break; }
                  default: { break; }
              }//switch

              let __pin = document.createElement("IMG");
              __pin.setAttribute("src", Pointer);
              __pin.style.width = _pinW + "px";
              __pin.style.height = _pinH + "px";

              __pin.style.position = 'absolute';
              __pin.style.left = _perL + "%";
              __pin.style.top = _perT + "%";

              document.getElementById("divBoxArea"+i).appendChild(__pin);

          }//for

      }//for
    }

  }, [divMapa, pageLang]);

  

  return (
    <Fragment>
        {/* <p className="position-absolute p-3 mb-2 bg-dark text-white">{cheese}</p> */}
        {/* <img src={Mapa} className="img-fluid position-relative" alt="Map" /> */}
        <div id="divMapa" ref={divMapa} className="classDivMap"></div>
    </Fragment>
  );

  
};

export default MapLovers;