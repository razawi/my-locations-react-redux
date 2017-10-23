import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

const Footer = () => (
    <div>
     <button>
      <Link to="/Categories">Categories</Link>
     </button>
     <button>
      <Link to="/Locations">Locations</Link>
     </button>
    </div>
  )
  
  export default Footer