import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class EditTheatre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hallName: '',
      showtime1: '',
      showtime2: '',
      showtime3: '',
      showtime4: ''
    }
  }

  componentDidMount = () => {
    const {editTheatre} = this.findEditableTheatre();
    this.setState({
      hallName: editTheatre.name,
      showtime1: editTheatre.showTimings[0] || '',
      showtime2: editTheatre.showTimings[1] || '',
      showtime3: editTheatre.showTimings[2] || '',
      showtime4: editTheatre.showTimings[3] || ''
    });
  }

  findEditableTheatre = () => {
    const editTheatreId = parseInt(this.props.match.params.id, 10);
    let theatres, editTheatre;
    if (localStorage.getItem('theatres')) {
      theatres = JSON.parse(localStorage.getItem('theatres'));
    }
    editTheatre = theatres.find(theatre => theatre.id === editTheatreId);
    return { theatres, editTheatre }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {theatres, editTheatre} = this.findEditableTheatre();
    const {hallName, showtime1, showtime2, showtime3, showtime4} = this.state;
    let showTimings = [showtime1, showtime2, showtime3, showtime4].filter(showtime => showtime.trim().length);

    if (hallName.trim().length && showTimings.length) {
      editTheatre.name = hallName;
      editTheatre.showTimings = showTimings;
      localStorage.setItem('theatres', JSON.stringify(theatres));
      this.props.history.push('/theatres');
    }
  }

  render() {
    return (
      <form>
        <TextFieldGroup label="Hall Name" name="hallName" type="text" value={this.state.hallName} placeholder="Hall Name" onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 1" name="showtime1" type="time" value={this.state.showtime1} onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 2" name="showtime2" type="time" value={this.state.showtime2} onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 3" name="showtime3" type="time" value={this.state.showtime3} onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 4" name="showtime4" type="time" value={this.state.showtime4} onChange={this.onChange}/>
        <button type="submit" onClick={this.onSubmit}>Update</button>
      </form>
    )
  }
}

export default EditTheatre;