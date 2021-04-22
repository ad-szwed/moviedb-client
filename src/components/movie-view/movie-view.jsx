import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button, Figure } from 'react-bootstrap';
import './movie-view.scss'

export default class MovieView extends React.Component {

  // key press console logging: {

  // keypressCallback(event) {
  //   console.log(event.key);
  // }

  // componentDidMount() {
  //   document.addEventListener('keypress', this.keypressCallback);
  // }

  // componentWillUnmount() {
  // code executed just before the moment the component gets removed from the DOM.
  //   document.removeEventListener('keypress', this.keypressCallback);
  // }
  // }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <Container className="text-white text-center movie-view">
        <Figure>
          <Figure.Image src={movie.imgUrl} />
          <Figure.Caption>
            {movie.title}
          </Figure.Caption>
        </Figure>

        {/* GENRE */}
        <div className="movie-genre">
          <span className="label">Genre: </span>
          {movie.genre.name.map(function (name, index) {
            return <li key={index}>{name}</li>;
          })}
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.director.name}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </Container>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.array.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};