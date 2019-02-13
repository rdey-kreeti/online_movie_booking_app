import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';

class Movies extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Header/>
        <ul>
          <li><Link to="/add-movie">Add a Movie</Link></li>
        </ul>
      </section>
    )
  }
}

export default Movies;