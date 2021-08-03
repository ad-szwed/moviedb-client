import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  console.log(movies);

  if (!movies) return <div className="main-view" />;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }


  return filteredMovies.map(m => (
    <Col md={3} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);