import React, {Component} from 'react';

class AdminDashboard extends Component {
  componentDidMount() {
    if(localStorage.getItem('adminLoggedIn') === null) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <h3>Succesfully Logged in</h3>
    )
  }
}

export default AdminDashboard;