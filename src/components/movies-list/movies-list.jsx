import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilter from '../visibility-filter/visibility-filter';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <VisibilityFilter visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);