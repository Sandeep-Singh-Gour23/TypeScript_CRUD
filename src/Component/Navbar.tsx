import { Row } from 'antd';
import '../style.scss';
import React from 'react'

const Navbar = () => {
  return (
      <Row>
          {/* <h1 style={{marginLeft:'0.5rem', color:'#E32020', fontFamily:'monospace'}}>
              React Task
          </h1> */}
          <div className='topnav'>
              <a href='/'>Home</a>
              <a href='/about'>About</a>
              <a>Contact Us</a>
          </div>
      </Row>
  )
}

export default Navbar