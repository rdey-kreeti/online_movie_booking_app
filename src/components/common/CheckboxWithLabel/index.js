import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked || false,
      inputValue: ''
    };
  }

  handleOnChange = (e) => {
    this.setState({
      isChecked: !this.state.isChecked,
      inputValue: e.target.name
    }, () => this.props.handleCheck(this.state.isChecked, this.state.inputValue, this.props.dataValue));
  }

  render() {
    return (
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-label__input"
          name={this.props.label}
          {...this.props.value && {'value': `${this.props.value}`}}
          {...this.props.dataValue && {'data-value': `${this.props.dataValue}`}}
          checked={this.state.isChecked}
          onChange={this.handleOnChange}
        />
        <span className="checkbox-label__text">{this.props.label}</span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  dataValue: PropTypes.object,
  handleCheck: PropTypes.func.isRequired
}

export default Checkbox;