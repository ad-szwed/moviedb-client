import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class MovieCard extends React.Component {

  render() {
    const { movie, onClick } = this.props;

    return (
      <Card>
        {/* <Card.Img variant="top" src={movie.imgUrl} /> */}
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          {/* <Card.Text>{movie.description}</Card.Text> */}
          <Button onClick={() => onClick(movie)} variant="primary">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}