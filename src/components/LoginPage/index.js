import React from 'react';
import LoginForm from '../LoginForm';

const ADMINS = [{email: 'a@a', password: '1234567'}];

const LoginPage = ({history}) => {
  return (
    <LoginForm users={ADMINS} history={history}/>
  )
}

export default LoginPage;