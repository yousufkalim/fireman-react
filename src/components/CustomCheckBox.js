import React from 'react';

const CustomCheckBox = ({ btnName, Name, id, For, onChange, disabled, checked, defaultChecked, width, textAlign }) => {
  return (
    <>
      <label style={{ width: width, justifyContent: textAlign ? 'center' : '' }} className="checkbox-btn-container">
        <input
          className="checkbox-filter"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          type="checkbox"
          name={Name}
          id={id}
          value={btnName}
        />
      </label>
    </>
  );
};

export default CustomCheckBox;
