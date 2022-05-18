import React from 'react'


const CustomRadioButton = ({btnName,Name,For,setState,onChange,disabled,checked,defaultChecked, width}) => {
  
  return (
   <>
    
   <label style={{width:width}} className="radio-btn-container" for={For}>
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