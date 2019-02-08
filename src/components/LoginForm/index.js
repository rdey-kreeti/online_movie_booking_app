import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import FlashMessagePopUp from '../common/FlashMessagePopUp';

import './index.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: this.props.users,
      email: '',
      password: '',
      errors: {},
      flashMessage: null
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
        localStorage.setItem('adminLoggedIn', isUserValid)
        this.props.history.push('/adminDashboard');
      }
    }
  }

  validateInput = (data) => {
    let errors = {};
    let isValid = false;
    if (!data.email.length) {
      errors.email = "Email can't be blank";
    } else if (data.email.length) {
      const emailReg = RegExp('.+\@.+\..+');
      const isEmailFieldValid = emailReg.test(data.email.toLowerCase());
      if(!isEmailFieldValid) {
        errors.email = "Email is invalid"
      }
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
        this.setState({ flashMessage: { type: "danger", messages: ["You have entered a wrong password"] } });
      }
    } else {
      this.setState({ flashMessage: { type: "danger", messages: ["User not found"] } });
    }

    return isUserValid;
  }

  render() {
    const {flashMessage} = this.state;
    return (
      <React.Fragment>
        {flashMessage && <FlashMessagePopUp flashMessage={this.state.flashMessage}/>}
        <section className="user-authentication">
          <TextFieldGroup label="email" type="email" name="email" placeholder="E-mail Address" onChange={this.onChange} value={this.state.email} error={this.state.errors.email} />
          <TextFieldGroup label="password" type="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={this.state.errors.password} />
          <button type="submit" className="btn primary-btn btn-block" onClick={this.onSubmit}>Login</button>
        </section>
      </React.Fragment>
    )
  }
}

export default LoginForm;