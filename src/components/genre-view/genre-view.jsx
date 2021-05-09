import React from 'react';
import { Card, Container } from 'react-bootstrap';

export default class GenreView extends React.Component {


  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    console.log("we''re at genre-view", genre)



    return (
      <div className='director-view'>
        Name:
        <Container>
          <Card className='director-card'>
            <Card.Body>
              <Card.Title className='director-name'>Name:</Card.Title>
            </Card.Body>
          </Card>

        </Container>
      </div>
    )
  }
}
