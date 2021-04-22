import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

export default class MovieCard extends React.Component {

  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className="movie-card" onClick={() => onClick(movie)}>
        <Card.Img src={movie.imgUrl} />
      </Card>
    );
  }
}