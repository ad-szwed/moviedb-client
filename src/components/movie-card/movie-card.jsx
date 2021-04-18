import React from 'react';
import PropTypes from 'prop-types';

export default class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">{movie.title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};