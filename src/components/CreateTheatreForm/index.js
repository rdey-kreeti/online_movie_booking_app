import React, {Component} from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateTheatreForm extends Component {
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

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {hallName, showtime1, showtime2, showtime3, showtime4} = this.state;
    let theatreList;
    let hallId;

    if (localStorage.getItem('theatres')) {
      theatreList = JSON.parse(localStorage.getItem('theatres'));
      hallId = theatreList.length ? theatreList[theatreList.length - 1].id + 1 : 1;
    } else {
      theatreList = [];
      hallId = 1;
    }

    let showTimings = [showtime1, showtime2, showtime3, showtime4].filter(showtime => showtime.trim().length);
    showTimings = showTimings.map((timing, index) => {
      return { id: (index + 1), timing: timing, booked: false }
    })

    if (hallName.trim().length && showTimings.length) {
       theatreList = [...theatreList, {id: hallId, name: hallName, showTimings: showTimings}];
       localStorage.setItem('theatres', JSON.stringify(theatreList));
       this.setState({hallName: '', showtime1: '', showtime2: '', showtime3: '', showtime4: ''})
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
        <button type="submit" onClick={this.onSubmit}>Create</button>
      </form>
    )
  }
}

export default CreateTheatreForm;