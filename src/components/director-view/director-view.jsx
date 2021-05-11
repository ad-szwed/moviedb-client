import React from 'react';

import { Figure, Container, Button } from 'react-bootstrap';


export default class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, onBackClick } = this.props;

    if (!director) return null;

    return (

      <Container>
        <Figure className="text-white">
          <Figure.Image src={director.picUrl} />
          <Figure.Caption>
            {director.name}
          </Figure.Caption>
          {director.bio}
        </Figure>
        <Button variant="primary" onClick={() => onBackClick()}>Back</Button>
      </Container>
    )
  }
}
