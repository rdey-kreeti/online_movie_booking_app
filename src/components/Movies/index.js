import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';

import './index.scss';

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('movies')) {
      this.setState({movies: JSON.parse(localStorage.getItem('movies'))})
    }
  }

  render() {
    const {movies} = this.state;

    return (
      <section>
        <Header/>
        <ul className="movies">
          {movies.map((movie, index) => {
            return (
              <li key={index} className="movies__item">
                <section style={{backgroundImage: `url(${movie.image})`}} className="movies__item__img"></section>
                <section className="movies__item__details">
                  <span className="movies__item__details__name">{movie.name}</span>
                  <section className="movies__item__details__others">
                    <span className="movies__item__details__others__item">{movie.genre}</span>
                    <span className="movies__item__details__others__item">{movie.category.toUpperCase()}</span>
                    <span className="movies__item__details__others__item">{movie.format}</span>
                  </section>
                </section>
                <section>
                  <Link to={`/movies/${movie.id}`}>Edit</Link>
                </section>
              </li>
            )
          })}
          <li><Link to="/add-movie">Add a Movie</Link></li>
        </ul>
      </section>
    )
  }
}

export default Movies;