import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';

export default class GenreView extends React.Component {


  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;
    console.log(genre);
    if (!genre) return null;

    return (
      <div className='director-view'>
        <Container>
          <Card className='director-card'>
            <Card.Body>
              <Card.Title className='director-name'>Name:{genre}</Card.Title>
            </Card.Body>
          </Card>
          <Button variant="primary" onClick={() => {
            onBackClick();
          }}>Back</Button>
        </Container>
      </div>
    )
  }
}
