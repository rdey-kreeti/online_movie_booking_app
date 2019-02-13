import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './index.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  componentDidMount = () => {
    if ( localStorage.getItem("adminLoggedIn")) {
      this.setState({isLogin: true})
    }
  }

  logout = () => {
    localStorage.removeItem("adminLoggedIn");
    this.setState({isLogin: false})
  }

  render() {
    const {isLogin} = this.state;
    const loginLink = <Link className="header__list__item__link" to="/login">Login</Link>;
    const logoutLink = <Link className="header__list__item__link" to="/" onClick={this.logout}>Logout</Link>;

    return (
      <nav className="header">
        <ul className="header__list">
        <li className="header__list__item"><Link className="header__list__item__link" to="/admin-dashboard">Admin Dashboard</Link></li>
          <li className="header__list__item">{isLogin ? logoutLink : loginLink}</li>
        </ul>
      </nav>
    )
  }
}

export default Header;