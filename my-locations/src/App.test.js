import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Entities
var category = {Name : 'Homes' } ;
var location = { Name : "Raz", 
      Address : "Mekor Chaim 66",
      Coordinates : "32.11,31.1",
      Category: "Home"
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


// Action Tests

// Reducer Tests

// Middleware Tests - save to local storgae (HTML 5)
//                    via the middlewear and check
//

// Component Tests
 



