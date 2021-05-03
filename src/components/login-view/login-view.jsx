import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';
import './login-view.scss'

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://szwedshop-moviedb.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        console.log('logged-in correctly')
      })
      .catch(e => {
        console.log('incorrect login credentials')
      });
  };

  return (

    <Form className="login-form">
      {/* LOGIN */}
      <Form.Label className="text-white">Username</Form.Label>
      <Form.Group controlId="formUsername">
        <Form.Control
          placeholder="Login"
          value={username}
          type="text"
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      {/* PASSWORD */}
      <Form.Group controlId="formPassword">
        <Form.Label className="text-white">Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
    </Form>

  );
}