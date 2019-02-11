import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';

const Theatres = () => {
  let theatres = [];

  if(localStorage.getItem('theatres')) {
    theatres = JSON.parse(localStorage.getItem('theatres'));
    console.log(theatres, 'theatres');
  }

  const twentyFourHrsConverter = (time) => {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

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
          </tr>
        </thead>
        <tbody>
          {theatres.map(theatre => {
            return (
              <React.Fragment>
                <tr>
                  <td>{theatre.id}</td>
                  <td>{theatre.name}</td>
                  {theatre.showTimings.map(timing => <td>{twentyFourHrsConverter(timing)}</td>)}
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default Theatres;