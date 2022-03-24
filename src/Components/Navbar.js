import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
      return (
        <div style={{ display: 'flex', padding: '0.5' }}>
          <Link to='/' style={{textDecoration: 'none'}}>
            <h1>Movies App</h1>
          </Link>
          <Link to='/favourites' style={{textDecoration: 'none'}}>
            <h2 style={{marginLeft: '2rem', marginTop: '1rem'}}>Favourites</h2>
          </Link>
      </div>
    )
  }
}
export default Navbar;