import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './login-view.scss'

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (

    <Form className="login-form">
      {/* LOGIN */}
      <Form.Group controlId="formUsername">
        <Form.Control
          placeholder="Login"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      {/* PASSWORD */}
      <Form.Group controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
    </Form>

  );
}