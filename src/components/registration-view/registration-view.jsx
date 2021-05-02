import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password, email, birthday);

  //   axios.post('https://szwedshop-moviedb.herokuapp.com/users', {
  //     username: username,
  //     password: password,
  //     email: email,
  //     birthday: birthday
  //   })
  //     .then(response => {
  //       const data = response.data;
  //       // props.onRegister(username);
  //       console.log(data);
  //       // window.open('/');
  //     })
  //     .catch(e => {
  //       console.log('problem registering new user');
  //     });
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  }

  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Choose username"
              onChange={e => setUsername(e.target.value)} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" placeholder="Enter Birthday"
              onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </Container>



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