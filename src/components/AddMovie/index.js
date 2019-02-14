import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectGroup from '../common/SelectGroup';
import CheckboxWithLabel from '../common/CheckboxWithLabel';
import FlashMessage from '../common/FlashMessagePopUp';

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieImage: '',
      movieName: '',
      movieCategory: '',
      movieFormat: '',
      movieGenre: '',
      flashMessage: null,
      theatres: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('theatres')) {
      this.setState({theatres: JSON.parse(localStorage.getItem('theatres'))});
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheck= (isChecked, value) => {
    let checkedItems;
    console.log(isChecked, value)
  }

  onSubmit = (e) => {
    e.preventDefault();
    let movies;
    let movieId;
    const {movieImage, movieName, movieCategory, movieFormat, movieGenre} = this.state;

    if(localStorage.getItem('movies')) {
      movies = JSON.parse(localStorage.getItem('movies'));
      movieId = movies.length ? movies[movies.length - 1].id + 1 : 1;
    } else {
      movies = [];
      movieId = 1;
    }

    if (movieImage.trim().length && movieName.trim().length && movieCategory.trim().length && movieFormat.trim().length && movieGenre.trim().length) {
      movies = [...movies, {id: movieId, image: movieImage, name: movieName, category: movieCategory, genre: movieGenre, format: movieFormat }];
      localStorage.setItem('movies', JSON.stringify(movies));
      this.setState({movieImage: '', movieName: '', movieCategory: '', movieFormat: '', movieGenre: ''});
      this.props.history.push('/movies');
    } else {
      this.setState({flashMessage: {type: 'danger', messages: ['Please fill out all the fields']}});
    }
  }

  render() {
    const {flashMessage, theatres} = this.state;
    const movieCategoryOptions = ['U', 'A', 'U/A'];
    const movieGenres = [ "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Thriller",
      "Animation", "Family", "Mystery", "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi", "War",     "Western", "Horror", "Musical", "Sport" ];
    const movieFormat = ['2D', '3D'];

    return (
      <form>
        <TextFieldGroup label="Movie Image" name="movieImage" type="text" value={this.state.movieImage} placeholder="Enter an image url" onChange={this.onChange} required/>
        <TextFieldGroup label="Movie Name" name="movieName" type="text" value={this.state.movieName} placeholder="Hall Name" onChange={this.onChange}/>
        <SelectGroup label="Movie Category" name="movieCategory" value={this.state.movieCategory} defaultOption="Select a category" options={movieCategoryOptions} onChange={this.onChange}/>
        <SelectGroup label="Movie Genre" name="movieGenre" value={this.state.movieGenre} defaultOption="Select a genre" options={movieGenres} onChange={this.onChange}/>
        <SelectGroup label="Movie Format" name="movieFormat" value={this.state.movieFormat} defaultOption="Select a format" options={movieFormat} onChange={this.onChange}/>
        <section>
          <span>Select a theatre</span>
          <ul>
            {theatres.map(theatre => {
              return (
                <li>
                  <span>{theatre.name}</span>
                  {theatre.showTimings.map((timing) => {
                    return (
                      <CheckboxWithLabel label={timing.timing} name={timing.timing} handleCheck={this.handleCheck}/>
                    )})}
                </li>
              )
            })}
          </ul>
        </section>
        <button type="submit" onClick={this.onSubmit}>Create</button>
        {flashMessage ? <FlashMessage flashMessage={this.state.flashMessage}/> : null }
      </form>
    )
  }
}

export default AddMovie;