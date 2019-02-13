import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const SelectGroup = ({label, name, options, value, onChange, defaultOption, error}) => {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <select name={name} className="input-group__select" value={value} onChange={onChange}>
        {defaultOption && <option>{defaultOption}</option>}
        {options.map((item, index) => <option key={index} value={item.toLowerCase()}>{item}</option>)}
      </select>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}

SelectGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectGroup;