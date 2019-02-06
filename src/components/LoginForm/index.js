import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: this.props.users,
      email: '',
      password: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const isInputsValid = this.isValid();
    if(isInputsValid) {
      const isUserValid = this.validateUser(this.state);
      if(isUserValid) {
        this.props.history.push('/adminDashboard');
      }
    }
  }

  validateInput = (data) => {
    let errors = {};
    let isValid = false;
    if (!data.email.length) {
      errors.email = "Email can't be blank";
    }
    if (!data.password.length) {
      errors.password = "Password can't be blank";
    } else if (data.password.length < 6) {
      errors.password = "Password must be minimum of 6 characters";
    }
    if(!Object.keys(errors).length) {
      isValid = true;
    }
    return { errors, isValid };
  }

  isValid = () => {
    const {errors, isValid} = this.validateInput(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  validateUser = (data) => {
    const email = data.email;
    const password = data.password;
    const {admins} = this.state;
    let isUserValid = false;
    let matchedAdmin = [];

    matchedAdmin = admins.filter(admin => admin.email.toLowerCase() === email.toLowerCase() );

    if (matchedAdmin.length) {
      if(matchedAdmin[0].password === password) {
        isUserValid= true;
      } else {
        console.log("You have entered wrong password");
      }
    } else {
      console.log("User not found");
    }

    return isUserValid;
  }

  render() {
    return (
      <React.Fragment>
        <TextFieldGroup label="email" type="email" name="email" placeholder="email" onChange={this.onChange} value={this.state.email} error={this.state.errors.email} />
        <TextFieldGroup label="password" type="password" name="password" placeholder="password" onChange={this.onChange} value={this.state.password} error={this.state.errors.password} />
        <button type="submit" onClick={this.onSubmit}>Login</button>
      </React.Fragment>
    )
  }
}

export default LoginForm;