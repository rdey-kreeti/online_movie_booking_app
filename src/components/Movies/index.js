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

  handleDeleteMovie = (id) => {
    const {movies} = this.state;
    const updateMovieList = movies.filter(movie => movie.id !== id);
    this.setState({movies: updateMovieList});
    localStorage.setItem('movies', JSON.stringify(updateMovieList));
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
                  <span onClick={() => this.handleDeleteMovie(movie.id)}>Delete</span>
                </section>
              </li>
            )
          })}
        </ul>
        <Link to="/add-movie">Add a Movie</Link>
      </section>
    )
  }
}

export default Movies;