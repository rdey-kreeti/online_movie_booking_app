import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';

class AdminDashboard extends Component {
  componentDidMount() {
    if(localStorage.getItem('adminLoggedIn') === null) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <section>
        <Header />
        <ul>
          <li><Link to="/theatres">Theatres</Link></li>
          <li><Link to="/movies">Movies</Link></li>
        </ul>
      </section>
    )
  }
}

export default AdminDashboard;