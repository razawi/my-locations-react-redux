import React from 'react'
import './Footer.css'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

  // todo - make link set viewState In order to rerender the Header.
const Footer = () => (
    <div className= "footerBody">
     <button>
       <Link to="/Categories">Categories</Link>
     </button>
     <button>
       <Link to="/Locations">Locations</Link>
     </button>
    </div>
  )
  
  export default Footer