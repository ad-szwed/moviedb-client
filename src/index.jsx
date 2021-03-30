import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import statement indicating the need of bundling ./index.scss
import './index.scss'

// Main component
class movieDBapp extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}
// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(movieDBapp), container);