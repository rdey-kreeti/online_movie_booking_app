import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';

class Theatres extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theatres: []
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem('theatres')) {
      this.setState({theatres: JSON.parse(localStorage.getItem('theatres'))})
    }
  }

  createShowtimeCell = (obj,index) => {
    const time = obj.showTimings[index];
    if (time) {
      return <td>{this.twentyFourHrsConverter(time)}</td>
    }
    return <td>-</td>
  }

  twentyFourHrsConverter = (time) => {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  handleDeleteTheatre = (id) => {
    console.log(id);
    let {theatres} = this.state;
    theatres = theatres.filter(theatre => theatre.id !== id);
    this.setState({theatres});
    localStorage.setItem('theatres', JSON.stringify(theatres));
  }

  render() {
    let {theatres} = this.state;

    return (
      <section>
        <Header/>
        <ul>
          <li><Link to="/create-theatre">Create a Theatre</Link></li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Theatre Name</th>
              <th>Showtime 1</th>
              <th>Showtime 2</th>
              <th>Showtime 3</th>
              <th>Showtime 4</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {theatres.map(theatre => {
              return (
                <React.Fragment>
                  <tr>
                    <td>{theatre.id}</td>
                    <td>{theatre.name}</td>
                    {[1,2,3,4].map((i, index) => this.createShowtimeCell(theatre, index))}
                    <td><Link to={`/theatres/${theatre.id}`}>edit</Link></td>
                    <td><span onClick={() => this.handleDeleteTheatre(theatre.id)}>delete</span></td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Theatres;