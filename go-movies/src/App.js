import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './Components/Home';
import InputProduction from "./Components/InputProduction";
import Chicks from "./Components/Chicks";
import ChickProduction from './Components/ChickProduction';
import ChickHatchery from './Components/ChickHatchery';
import ChickDetail from "./Components/ChickDetail";
import allChicks from "./Components/allChicks";
import InputHatchery from "./Components/InputHatchery";

export default function App() {
  return (
      <Router>
        <div className="container">

          <div className="row">
            <h1 className="mt-3">
              Farm Manager
            </h1>
            <hr className="mb-3"/>
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/all_chicks">All Chicks</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/chicks">Chicks</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/add-production">Production</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/add-hatchery">Hatchery</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Switch>

                <Route path="/all_chicks" component={allChicks}/>

                <Route path="/all_chicks">
                  <allChicks/>
                </Route>
                <Route exact path="/chicks/:chick" component={ChickDetail}/>

                <Route exact path="/chicks" component={Chicks}/>


                <Route exact path="/chicks/:chick/production" component={ChickProduction}/>
                <Route exact path="/chicks/:chick/hatchery" component={ChickHatchery}/>

                <Route exact path="/add-production" component={InputProduction}/>
                <Route exact path="/add-hatchery" component={InputHatchery}/>

                <Route path="/">
                  <Home/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
  );



};