import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './movie-card.scss'

export default class MovieCard extends React.Component {

  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className="movie-card">

        <Link to={`/movies/${movie._id}`}>
          <Card.Img src={movie.imgUrl} />
        </Link>
      </Card>
    );
  }
}