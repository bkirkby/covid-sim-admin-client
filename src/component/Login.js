import React, { useState } from 'react';
import { login } from '../api';

const Login = props => {
  const [loginState, setLoginState] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('bk: Login.js: loginState: ', loginState);
    setError('');
    login(loginState.username, loginState.password)
      .then(res => {
        props.history.push('/graph-list');
      })
      .catch(err_message => {
        console.error('unable to login: ', err_message);
        setError(`unable to login: ${err_message}`);
      });
  }

  const handleChange = e => {
    e.preventDefault();
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  }

  return <div>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <form onSubmit={handleSubmit}>
      username: <input type="text" placeholder="username" name="username" value={loginState.username} onChange={handleChange}></input><br />
      password: <input type="password" placeholder="password" name="password" value={loginState.password} onChange={handleChange}></input><br />
      <button type="submit">login</button>
    </form>
  </div>
};

export default Login;