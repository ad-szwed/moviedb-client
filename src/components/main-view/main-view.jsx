import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import LoginView from '../login-view/login-view';
import RegisterView from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

import './main-view.scss';

// ONLY ONE DEFAULT EXPORT PER FILE!!!
// export default 
class MainView extends React.Component {

  // we put our states inside a constructor()
  constructor() {
    super();
    // code executed right when the component is created in the memory, inheritance
    this.state = {
      // states are my variables
      // movies: [],
      // selectedMovie: null,
      user: null,
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

  // Retrieving movies from API
  getMovies(token) {
    axios.get('YOUR_API_URL/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
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

  // onRegister(register) {
  //   this.setState({
  //     register
  //   });
  // }


  render() {
    let { movies } = this.props;
    let { user, register } = this.state;

    return (
      <React.Fragment>
        <Router>
          {/* NAVIGATION */}
          <Navbar bg="dark" variant="dark" fixed="top">
            <Link to={'/'}>
              <Navbar.Brand><h5>MOVIEdb</h5></Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            {/* PROFILE OPTIONS */}
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">

                {/* condition to display profile option if there's user logged-in */}
                {user ?
                  <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{ marginRight: 100 }}>
                    <NavDropdown.Item href="/profile/">Profile view</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={() => { this.onLoggedOut() }}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  : null}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Row className='main-view text-center justify-content-md-center'>

            {/* MAIN SCREEN VIEW */}
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return (<MoviesList movies={movies} />);
            }
            } />

            {/* SPECIFIC MOVIE VIEW */}
            <Route exact path="/movies/:movieId" render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />
              return <Col md={8}>
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)} />
              </Col>
            }} />

            {/* GENRE VIEW */}
            <Route exact path="/genre/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />
              return <Col md={8}>
                <GenreView
                  genre={match.params.name}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* DIRECTORS VIEW */}
            <Route exact path="/directors/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />
              return <Col md={8}>
                <DirectorView
                  director={movies && movies.find(m => m.director.name === match.params.name).director}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* LOGIN VIEW */}
            <Route exact path="/log-in" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return (<MoviesList movies={movies} />);
            }
            } />

            {/* REGISTRATION VIEW */}
            <Route path="/register" render={() => {
              if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />
            }} />
            {/* PROFILE VIEW */}
            <Route exact path="/profile" render={({ }) => {
              return <Col md={9}>
                {/* key={value} */}
                <ProfileView movies={movies} />
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
