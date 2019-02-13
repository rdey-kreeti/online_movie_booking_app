import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectGroup from '../common/SelectGroup';

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieName: '',
      movieCategory: '',
      movieFormat: '',
      movieGenre: ''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    let movies;
    let movieId;
    const {movieName, movieCategory, movieFormat, movieGenre} = this.state;

    if(localStorage.getItem('movies')) {
      movies = JSON.parse(localStorage.getItem('movies'));
      movieId = movies.length ? movies[movies.length - 1].id + 1 : 1;
    } else {
      movies = [];
      movieId = 1;
    }

    movies = [...movies, {id: movieId, name: movieName, category: movieCategory, genre: movieGenre, format: movieFormat }];
    localStorage.setItem('movies', JSON.stringify(movies));
    this.setState({movieName: '', movieCategory: '', movieFormat: '', movieGenre: ''});
    this.props.history.push('/movies');
  }

  render() {
    const movieCategoryOptions = ['U', 'A', 'U/A'];
    const movieGenres = [
      "Comedy",
      "Fantasy",
      "Crime",
      "Drama",
      "Music",
      "Adventure",
      "History",
      "Thriller",
      "Animation",
      "Family",
      "Mystery",
      "Biography",
      "Action",
      "Film-Noir",
      "Romance",
      "Sci-Fi",
      "War",
      "Western",
      "Horror",
      "Musical",
      "Sport"
    ];
    const movieFormat = ['2D', '3D'];
    return (
      <form>
        <TextFieldGroup label="Movie Name" name="movieName" type="text" value={this.state.movieName} placeholder="Hall Name" onChange={this.onChange}/>
        <SelectGroup label="Movie Category" name="movieCategory" value={this.state.movieCategory} defaultOption="Select a category" options={movieCategoryOptions} onChange={this.onChange}/>
        <SelectGroup label="Movie Genre" name="movieGenre" value={this.state.movieGenre} defaultOption="Select a genre" options={movieGenres} onChange={this.onChange}/>
        <SelectGroup label="Movie Format" name="movieFormat" value={this.state.movieFormat} defaultOption="Select a format" options={movieFormat} onChange={this.onChange}/>
        <button type="submit" onClick={this.onSubmit}>Create</button>
      </form>
    )
  }
}

export default AddMovie;