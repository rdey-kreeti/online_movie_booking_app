import React, {Component} from 'react';
import LoginForm from '../LoginForm';

const ADMINS = [{email: 'a@a.com', password: '1234567'}];

class LoginPage extends Component {
  componentDidMount() {
    if(localStorage.getItem('adminLoggedIn') !== null) {
      this.props.history.push('/admin-dashboard');
    }
  }

 render() {
  return (
    <LoginForm users={ADMINS} history={this.props.history}/>
  )
 }
}

export default LoginPage;