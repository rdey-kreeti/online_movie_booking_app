import React from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const TextFieldGroup = ({label, type, name, value, onChange, placeholder, error}) => {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`input-group__input ${error ? 'error' : ''}`}
      />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;