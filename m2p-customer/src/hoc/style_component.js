import React, { Component } from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux'



// const colorcode="red";

// const colorcode;
// const colorcode1 = this;
// console.log(colorcode1,"colorcode")
// console.log(counter,"counter")
// if(sessionStorage.getItem("colorcode")){
// const red =this.props.location.search
// console.log(red,"red")
const colorcode = localStorage.getItem("colorcode");
// console.log(this.props.colorcode,"d.colorcode")
console.log(colorcode, "colorcode");
// }else{
  // const colorcode = "red";

// }

export const SytledH1 = styled.h1`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;
export const SytledH2 = styled.h2`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledH4 = styled.h4`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

// color: ${colorcode} !important;
// color: ${colorcode} !important;
export const SytledH5 = styled.h5`
color: ${props => props.color ? props.color : "#414dd3"} !important;
.link_button {
  background-color: ${props => props.color ? props.color : "#414dd3"} !important;
  border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;
}
`;

export const SytledH6 = styled.h6`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;
export const SytledDIV = styled.div`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledDIVPRO = styled.div`
background-color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledP = styled.p`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;
export const SytledSPAN = styled.span`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;
export const SytledSPANBG = styled.span`
background-color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledSELECT = styled.select`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledSELECT1 = styled.select`
background-color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledINPUT = styled.input`
border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledSMALL = styled.small`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledLabel = styled.label`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledBUTTON = styled.button`
background-color: ${props => props.color ? props.color : "#414dd3"} !important;
border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const SytledBUTTONBOR = styled.button`
color: ${props => props.color ? props.color : "#414dd3"} !important;
border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;
:hover {
    background:${props => props.color ? props.color : "#414dd3"} !important;
    color:white !important;
  }

`;

export const SytledA = styled.a`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const RadioButtonWrapper = styled.div`
  & label {
    background-color: white;
    border-radius:50%;
    &:after {
      // background-color: black;
      border-radius:50%;
      
    }
  }
  &: before {
    border: 1px solid ${props => props.color ? props.color : "#414dd3"} !important; 
    position: absolute;
    top: 0.25rem;
    left: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #dee2e6;
    border-radius:50%;

}
  }

  & input[type="radio"] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    border: 1px solid ${props => props.color ? props.color : "#414dd3"} !important; 

  }

  & input[type="radio"]:checked + label:after {
    background-color: ${props => props.color ? props.color : "#414dd3"} !important;
    border: 1px solid ${props => props.color ? props.color : "#414dd3"} !important; 


  }
  .text-primary{
    color: ${props => props.color ? props.color : "#414dd3"} !important;

  }
`;


export const CheckButtonWrapper = styled.div`
  & label {
    background-color: white;
    &:after {
      // background-color: black;
      
    }
  }
  &: before {
    position: absolute;
    top: 0.25rem;
    left: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #dee2e6;
    border:1px solid 

}
  }

  & input[type="checkbox"] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    
  }

  & input[type="checkbox"]:checked + label:after {
    background-color: ${props => props.color ? props.color : "#414dd3"} !important;
    border: 1px solid ${props => props.color ? props.color : "#414dd3"} !important; 


  }
`;


// export const StyledRadioBtn  = styled.input.attrs({ type: "radio" })`

// `;
// export const StyledRadioBtn = styled.input`&[type="radio"]{
//   position: absolute
//   &:checked:before{
//       content:"";
//       font: 17px/1 'Open Sans', sans-serif;
//       position:absolute;
//       width: 100%;
//       height: 100%;
//       background:orange;
//       border-radius: 100%;
//       left: 0;
//       top: 0;
//     }

// }

// `;

export const LabelText1 = styled.label`
.text-primary {
  color:${props => props.color ? props.color : "#414dd3"} !important;
}

// :checked .custom-control-label
// :before {
//     background-color: ${props => props.color ? props.color : "#414dd3"} !important;
//     border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;


//   }
`;

export const StyledFile  = styled.input.attrs({ type: 'file' })`
border:2px solid ${props => props.color ? props.color : "#414dd3"} !important;
`;
 export const InputCheckbox = styled.input.attrs({ type: "checkbox" })`
`;

export const LabelText = styled.label`
${InputCheckbox}:checked + && {
    color: red;
  }
`;

export const Sytledth = styled.th`
color: ${props => props.color ? props.color : "#414dd3"} !important;
`;

export const Sytledthead = styled.thead`
background-color: ${props => props.color ? props.color : "#414dd3"} !important;
`;


// export const SytledLINK = styled.link`
// color: ${colorred} !important;
// `;

// export default {SytledH1, StyledH5};
// .custom-radio .custom-control-input:checked~.custom-control-label::before {
//     background-color: #007bff;
// }