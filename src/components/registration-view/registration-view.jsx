import React, { useState } from 'react';
import PropTypes from "prop-types";

export default function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  }

  return (
    <form>
      <label>
        Email:
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type='text' value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <label>
        Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type='submit' onClick={onSubmit}>Submit</button>
    </form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired
  }),
  onRegister: PropTypes.func.isRequired
};