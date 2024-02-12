import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Landing from "./components/Landing";
import TransLogs from "./components/TransLogs"
import Components from './components/Components';
import Simulation from './components/Simulation';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route
              path = "/"
              element = {<Landing />}
            />

            <Route
              path = "/trans-logs"
              element = {<TransLogs />}
            />

            <Route
              path = "/components"
              element = {<Components />}
            />

            <Route
              path = "/simulation"
              element = {<Simulation />}
            />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
