import React from 'react';

import { Card, Container } from 'react-bootstrap';


export default class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    console.log("we''re at director-view", director)

    if (!director) return null;

    return (
      <div className='director-view'>
        Name:
        <Container>
          <Card className='director-card'>
            <Card.Body>
              <Card.Title className='director-name'>Name: {director.name}</Card.Title>
            </Card.Body>
          </Card>

        </Container>
      </div>
    )
  }
}
