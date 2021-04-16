// imports must be in { } if not exported default

import React from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }
  // hook, component
  componentDidMount() {
    axios.get('https://szwedshop-moviedb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => console.log(error));
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state; //ES6, object destructuring:
    // const movies = this.state.movies;
    // const selectedMovie = this.state.selectedMovie;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/* map loops over the items and it transforms its values */}
        {movies.map(movie => <MovieCard key={movie._id} movie={movie} //props = key, movie {} - for the variables
          onMovieClick={newSelectedMovie => {
            this.setState({ selectedMovie: newSelectedMovie });
          }} />)}
      </div>
    );
  }
}

// ONLY ONE DEFAULT EXPORT PER FILE!!!
export default MainView;