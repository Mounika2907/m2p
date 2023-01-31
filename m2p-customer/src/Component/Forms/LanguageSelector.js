import React, { useContext } from 'react';
import { LanguageContext } from '../../View/Language/Language';
import { languageOptions } from '../../Languages';
import {SytledSELECT} from '../../hoc/style_component';


const LanguageSelector = (props) => {
    const languageContext = useContext(LanguageContext);

    const handleChange = (event) => {
        event.preventDefault();
        sessionStorage.setItem('lang', event.target.value);
        const selectedLanguage = languageOptions.find(item => item.id === event.target.value);

        languageContext.setLanguage(selectedLanguage);
    }

    return (
        <SytledSELECT color={props.color} onChange={handleChange} className="language">
        {/* <select onChange={handleChange} className="language"> */}
            {languageOptions.map((item => (
                <option key={item.id} value={item.id}>{item.text}</option>
            )))}
        {/* </select> */}
        </SytledSELECT>
    )
}

export default LanguageSelector;