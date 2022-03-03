import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter,Route, Router, Link} from "react-router-dom"
import CRUD from './Component/CRUD';
import Navbar from './Component/Navbar';
import About from './Component/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Route path="/" exact component = {CRUD}/>
          <Route path="/about" exact component={About}/>
         </BrowserRouter>

        {/* <Navbar />
        <CRUD /> */}

    </div>
  );
}

export default App;
