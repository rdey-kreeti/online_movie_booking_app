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
      theatres: [],
      selectedTheatres: []
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

  handleCheck= (isChecked, value, dataValue) => {
    const {theatres, selectedTheatres} = this.state;
    let updateTheatre;


    if(isChecked) {
      updateTheatre = theatres.find(theatre => theatre.id === dataValue.theatreId);
      updateTheatre = updateTheatre.showTimings.find(showTime => showTime.id === dataValue.showTimeId);
      updateTheatre.booked = true;
      this.setState({theatres: theatres, selectedTheatres: [...this.state.selectedTheatres, dataValue]});

    } else if (!isChecked) {
      const updatedSelectedTheatres = selectedTheatres.filter(item => !((item.theatreId === dataValue.theatreId) && (item.showTimeId === dataValue.showTimeId)));
      updateTheatre = theatres.find(theatre => theatre.id === dataValue.theatreId);
      updateTheatre = theatres.showTimings.find(showTime => showTime.id === dataValue.showTimeId);
      updateTheatre.booked = false;
      this.setState({theatres: theatres, selectedTheatres: updatedSelectedTheatres});
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let movies;
    let movieId;
    const {movieImage, movieName, movieCategory, movieFormat, movieGenre, theatres} = this.state;

    if(localStorage.getItem('movies')) {
      movies = JSON.parse(localStorage.getItem('movies'));
      movieId = movies.length ? movies[movies.length - 1].id + 1 : 1;
    } else {
      movies = [];
      movieId = 1;
    }

    const mergeShowTimeIds = () => {
      let {selectedTheatres} = this.state;

      let mergedArray = [];
      selectedTheatres.forEach(element => {
        const matchedElement = mergedArray.find(el => el.theatreId === element.theatreId);

        if (matchedElement === undefined) {
          mergedArray.push({theatreId: element.theatreId, showTimeIds:[element.showTimeId]});
        } else if (matchedElement) {
          matchedElement.showTimeIds.push(element.showTimeId);
          matchedElement.showTimeIds.sort((a, b) => a - b);
        }
      });

      return mergedArray;
    }

    if (movieImage.trim().length && movieName.trim().length && movieCategory.trim().length && movieFormat.trim().length && movieGenre.trim().length) {
      movies = [...movies, {id: movieId, image: movieImage, name: movieName, category: movieCategory, genre: movieGenre, format: movieFormat, associatedTheatres: mergeShowTimeIds() }];
      localStorage.setItem('movies', JSON.stringify(movies));
      localStorage.setItem('theatres', JSON.stringify(theatres));
      this.setState({movieImage: '', movieName: '', movieCategory: '', movieFormat: '', movieGenre: ''});
      this.props.history.push('/movies');
    } else {
      this.setState({flashMessage: {type: 'danger', messages: ['Please fill out all the fields']}});
    }
  }

  onCancel = () => {
    this.props.history.push('/movies');
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
        <TextFieldGroup label="Movie Name" name="movieName" type="text" value={this.state.movieName} placeholder="Movie Name" onChange={this.onChange}/>
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
                      <CheckboxWithLabel label={timing.timing} name={timing.timing} dataValue={{theatreId: theatre.id, showTimeId: timing.id}} handleCheck={this.handleCheck}/>
                    )})}
                </li>
              )
            })}
          </ul>
        </section>
        <button type="submit" onClick={this.onSubmit}>Create</button>
        <button type="button" onClick={this.onCancel}>Cancel</button>
        {flashMessage ? <FlashMessage flashMessage={this.state.flashMessage}/> : null }
      </form>
    )
  }
}

export default AddMovie;