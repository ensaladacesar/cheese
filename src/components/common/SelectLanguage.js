import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {translateAction} from '../../actions/languagesActions';

const SelectLanguage = ({ select, valor, setValue }) => {
  const dispatch = useDispatch();
  const [changeLang, setChangeLang] = useState({    
    valorChange: valor
  });

    const { valorChange } = changeLang;
  // console.log(valorChange)

  // console.log('valor cambiado', changeLang)

  useEffect(() => {
    // if (valor) {
    //   select.map((option) =>
    //     //  console.log( l1.current.swiper.visibleSlides[1].outerText)
    //     //  console.log(language.idioma)
    //     valor === option.lang
    //       ? //   console.log("idioma activo", option)
    //         setChangeLang({              
    //           valorChange: option.lang
    //         })
    //       : null
    //   );
    // }
    setValue(valorChange);
  }, [ valorChange, setValue]);

  const handleChangeLang = (e, i) => {
    const {value, selectedIndex} = e.target;
      // console.log('select value ', value);
      // console.log('select index ', selectedIndex);
    setChangeLang({     
      ...changeLang,
      valorChange: value
    });
    dispatch(translateAction(selectedIndex));  
  };

  return (
    <div className="language__select">
      <select
        onChange={(e, i) => handleChangeLang(e, i)}
        name="idiomas"
        value={valorChange}
      >
        {select.map((sel, index) => (
          <option key={index} value={sel.lang}>
            {sel.name1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
