// imports must be in { } if not exported default

import React from 'react';
import axios from 'axios';

import LoginView from '../login-view/login-view';
import RegisterView from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './main-view.scss'

// ONLY ONE DEFAULT EXPORT PER FILE!!!
export default class MainView extends React.Component {

  // we put our states inside a constructor()
  constructor() {
    super();
    // code executed right when the component is created in the memory, inheritance
    this.state = {
      // states are my variables
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  // hook, component, 
  componentDidMount() {
    // code executed right after the component is added to the DOM.
    axios.get('https://szwedshop-moviedb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => console.log(error));
  }
  /*When a movie is clicked, this function is invoked 
  and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property 
  in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }


  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // back button
    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (!register) return <RegisterView onRegister={register => this.onRegister(register)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        {/* NAVIGATION */}
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#home"><h5>MOVIEdb</h5></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* PROFILE OPTIONS */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{ marginRight: 10 }}>
                <NavDropdown.Item href="favourites">Favourites</NavDropdown.Item>
                <NavDropdown.Item href="login-page">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* MOVIE CARDS */}
        <div className='main-view text-center'>
          {selectedMovie ? (
            <MovieView
              movie={selectedMovie}
            />
          ) : (
            <Container>
              <Row style={{ marginTop: 100, marginBottom: 100 }}>
                {movies.map((movie) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      onClick={(movie) => this.onMovieClick(movie)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </div>

        {/* FOOTER */}
        <footer className='fixed-bottom bg-dark text-white text-center'>
          <h5 className='pt-3'>
            POWERED BY <a className="szwed-shop" href="https://ad-szwed.github.io" target="blank">&lt;Coding szwed-shop&gt;</a>
          </h5>
        </footer>
      </React.Fragment>
    );
  }
}