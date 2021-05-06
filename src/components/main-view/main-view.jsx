// imports must be in { } if not exported default

import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import RegisterView from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
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

  // hook, component, code executed right after the component is added to the DOM.
  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://szwedshop-moviedb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // LOCAL STORAGE TO KEEP USER LOGGED-IN {
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }


  render() {
    const { movies, user, register } = this.state;

    // back button
    {/* if (selectedMovie) return <MovieView movie={selectedMovie}
      onBackClick={movieSelection => this.setSelectedMovie(movieSelection)
      } />; */ }

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

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
              <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{ marginRight: 100 }}>
                <NavDropdown.Item href="favourites">Profile view</NavDropdown.Item>
                <NavDropdown.Item href="login-page" onClick={() => { this.onLoggedOut() }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* ROUTING */}
        <Router>
          <Row className='main-view text-center justify-content-md-center'>

            {/* MAIN SCREEN VIEW */}
            <Route exact path="/" render={() => {
              return movies.map(movie => (
                <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                  />
                </Col>
              ))
            }} />
            {/* SPECIFIC MOVIE VIEW */}

            <Route path="/movies/:movieId" render={({ match }) => {
              return <Col md={8}>
                <MovieView
                  onBackClick={() => history.goBack()}
                  movie={movies.find(m => m._id === match.params.movieId)} />
              </Col>
            }} />

            {/* GENRE VIEW */}
            <Route exact path="/genre/:name" render={({ match }) => {
              return <Col md={8}>
                <GenreView genre={movies.find(m.genre.name === match.params.name).genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* DIRECTORS VIEW */}
            <Router exact path="/directors/:name" render={({ match, history }) => {
              if (movie.length === 0) return <div className="main-view" />
              return <Col md={8}>
                <DirectorView director={movies.find(m.director.name === match.params.name).director}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* LOGIN VIEW */}
            <Route exact path="/log-in" render={() => {
              return <Col md={9}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            }} />

            {/* REGISTRATION VIEW */}
            <Route exact path="/register" render={({ match }) => {
              return <Col md={9}>
                <RegisterView />
              </Col>
            }} />

            {/* PROFILE VIEW */}
            <Route exact path="/profile" render={({ match }) => {
              return <Col md={9}>
                <ProfileView profile={users.find(u => u._id === match.params.userId)} />
              </Col>
            }} />
          </Row>
        </Router>


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