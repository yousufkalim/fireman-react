import React from 'react'


const CustomRadioButton = ({btnName,Name,For,onChange,disabled,checked,defaultChecked, width,textAlign}) => {
  
  return (
   <>
   <label style={{width:width, justifyContent:textAlign?"center":""}} className="radio-btn-container" for={For}>
    <input
    checked={checked}
    defaultChecked={defaultChecked}
    disabled={disabled} 
    onChange={onChange} 
    type="radio"
    name={Name} 
    value={btnName}/> {""}
    </label>
   </>
  )
}

export default CustomRadioButton