import React, { useState } from 'react';
import { login } from '../api';

const Login = props => {
  const [loginState, setLoginState] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('bk: Login.js: loginState: ', loginState);
    await login(loginState.username, loginState.password)
      .catch(err => {
        console.error('unable to login: ', err);
      });
    props.history.push('/report-list');
  }

  const handleChange = e => {
    e.preventDefault();
    setLoginState({...loginState, [e.target.name]: e.target.value});
  }

  return <div>
    <form onSubmit={handleSubmit}>
      username: <input type="text" placeholder="username" name="username" value={loginState.username} onChange={handleChange}></input><br/>
      password: <input type="password" placeholder="password" name="password" value={loginState.password} onChange={handleChange}></input><br/>
      <button type="submit">login</button>
    </form>
  </div>
};

export default Login;