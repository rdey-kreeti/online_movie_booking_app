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
      showtime1: editTheatre.showTimings.find(el => el.id === 1) ? editTheatre.showTimings.find(el => el.id === 1).timing : '',
      showtime2: editTheatre.showTimings.find(el => el.id === 2) ? editTheatre.showTimings.find(el => el.id === 2).timing : '',
      showtime3: editTheatre.showTimings.find(el => el.id === 3) ? editTheatre.showTimings.find(el => el.id === 3).timing : '',
      showtime4: editTheatre.showTimings.find(el => el.id === 4) ? editTheatre.showTimings.find(el => el.id === 4).timing : ''
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
    let {theatres, editTheatre} = this.findEditableTheatre();
    const {hallName, showtime1, showtime2, showtime3, showtime4} = this.state;
    let previousShowTimes = editTheatre.showTimings;
    const newShowTimes = [showtime1, showtime2, showtime3, showtime4];
    let validateShowTimings = [showtime1, showtime2, showtime3, showtime4].filter(showtime => showtime.trim().length);

    if (hallName.trim().length && validateShowTimings.length) {
      editTheatre.name = hallName;
      [1, 2, 3, 4].map((el,index) => {
        const previousShowTime = previousShowTimes.find(showTime => showTime.id === (index + 1));

        if(!newShowTimes[index].trim().length) {
          // should have checking for bookings against this timing
          previousShowTimes = previousShowTimes.filter(showTime => showTime.id !== (index + 1));
        } else if(previousShowTime) {
          previousShowTime.timing = newShowTimes[index];
        } else if (newShowTimes[index].trim().length) {
          previousShowTimes.push({id: index + 1, timing: newShowTimes[index], booked: false});
        }
      })

      editTheatre = theatres.find( theatre => theatre.id === editTheatre.id);
      editTheatre.showTimings = previousShowTimes;

      localStorage.setItem('theatres', JSON.stringify(theatres));
      console.log(editTheatre.showTimings);
    }
  }

  onCancel = () => {
    this.props.history.push('/theatres');
  }

  render() {
    return (
      <form>
        <TextFieldGroup label="Hall Name" name="hallName" type="text" value={this.state.hallName} placeholder="Hall Name" onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 1" name="showtime1" type="time" value={this.state.showtime1} onChange={this.onChange} onClick={this.onChange}/>
        <TextFieldGroup label="Showtime 2" name="showtime2" type="time" value={this.state.showtime2} onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 3" name="showtime3" type="time" value={this.state.showtime3} onChange={this.onChange}/>
        <TextFieldGroup label="Showtime 4" name="showtime4" type="time" value={this.state.showtime4} onChange={this.onChange}/>
        <button type="submit" onClick={this.onSubmit}>Update</button>
        <button type="button" onClick={this.onCancel}>Cancel</button>
      </form>
    )
  }
}

export default EditTheatre;