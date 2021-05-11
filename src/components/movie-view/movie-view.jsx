import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


import { Container, Button, Figure } from 'react-bootstrap';
import './movie-view.scss'

export default class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  // add favorite movie
  addFavourite = (e, movie) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`https://szwedshop-moviedb.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`${this.props.movie.title} added to Favorites List`)
        // window.location.pathname = `/users/${user}`
        this.setState({
          fav: true,
        });
      })
      .catch(function (error) {
        console.log(error, "!!add fav error");
      });
  };

  render() {
    const { movie, fav, addFavourite } = this.props;

    return (

      <Container className="text-white text-center movie-view">

        {/* MOVIE POSTER */}
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
            return <Link to={`/genre/${name}`}> <li key={index}>{name}</li> </Link>
          })}
        </div>

        {/* DIRECTOR */}
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.director.name}`}>
            <span className="value">{movie.director.name}</span>
          </Link>
        </div>

        {/* DESCRIPTION */}
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>

        {/* LE BACK BUTTON */}
        <Button variant="primary" href="/">Back</Button>

        {/* LE ADD TO FAVS BUTTON */}
        {!fav && <Button variant="secondary" onClick={this.addFavourite} style={{ marginLeft: 25 }}>Add to favourites</Button>}
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