import React from 'react';
import Header from '../common/Header'

const HomePage = () => {
  const headingStyle = {
    textAlign: 'center',
  }
  return (
    <section>
      <Header/>
      <h2 style={headingStyle}>Welcome to Online Movie Booking App</h2>
    </section>
  )
}

export default HomePage;