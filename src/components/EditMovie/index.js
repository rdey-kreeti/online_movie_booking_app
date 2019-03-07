import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectGroup from '../common/SelectGroup';
import CheckboxWithLabel from '../common/CheckboxWithLabel';
import FlashMessage from '../common/FlashMessagePopUp';

class EditMovie extends Component {
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
    let theatres;
    const {editableMovie} = this.findEditableMovie();

    if(localStorage.getItem('theatres')) {
      theatres = JSON.parse(localStorage.getItem('theatres'))
    }

    this.setState({
      movieImage: editableMovie.image,
      movieName: editableMovie.name,
      movieCategory: editableMovie.category,
      movieFormat: editableMovie.format,
      movieGenre: editableMovie.genre,
      theatres: theatres
    })
  }

  findEditableMovie = () => {
    let movies, editableMovie;
    const editableMovieId = parseInt(this.props.match.params.id, 10);
    if(localStorage.getItem('movies')) {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    editableMovie = movies.find(movie => movie.id === editableMovieId);
    return { movies, editableMovie };
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleCheck= (isChecked, value, dataValue) => {
    let {selectedTheatres} = this.state;

    if(isChecked) {
      this.setState({selectedTheatres: [...this.state.selectedTheatres, dataValue]})
    } else if (!isChecked) {
      const updatedSelectedTheatres = selectedTheatres.filter(item => !((item.theatreId === dataValue.theatreId) && (item.showTimeId === dataValue.showTimeId)));
      this.setState({selectedTheatres: updatedSelectedTheatres});
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {movies, editableMovie} = this.findEditableMovie();
    const {movieImage, movieName, movieCategory, movieFormat, movieGenre} = this.state;

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
      editableMovie.image = movieImage;
      editableMovie.name = movieName;
      editableMovie.category = movieCategory;
      editableMovie.category = movieCategory;
      editableMovie.genre = movieGenre;
      editableMovie.format = movieFormat;
      editableMovie.associatedTheatres = mergeShowTimeIds();
      localStorage.setItem('movies', JSON.stringify(movies));
      this.props.history.push('/movies');
    }
  }

  render() {
    const {flashMessage, theatres} = this.state;
    const {editableMovie} = this.findEditableMovie();
    const movieCategoryOptions = ['U', 'A', 'U/A'];
    const movieGenres = [ "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Thriller",
      "Animation", "Family", "Mystery", "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi", "War",     "Western", "Horror", "Musical", "Sport" ];
    const movieFormat = ['2D', '3D'];
    const associatedTheatres = editableMovie.associatedTheatres;

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
              const matchedAssociatedTheatre = associatedTheatres.find(el => el.theatreId === theatre.id);
              const associatedTheatreTimingIds = matchedAssociatedTheatre === undefined ? [] : matchedAssociatedTheatre.showTimeIds;

              return (
                <li>
                  <span>{theatre.name}</span>
                  {theatre.showTimings.map((timing) => {
                    return (
                      <CheckboxWithLabel
                        label={timing.timing}
                        name={timing.timing}
                        dataValue={{theatreId: theatre.id, showTimeId: timing.id}}
                        handleCheck={this.handleCheck}
                        isChecked={associatedTheatreTimingIds.includes(timing.id)}
                      />
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

export default EditMovie;