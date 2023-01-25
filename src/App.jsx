import React, { useReducer } from 'react';
import Context from './Context';
import Reducer from "./Reducer";
import List from './List';
import Details from './Details';
import initialState from './InitialState.json';
import './App.css';
import Comments from './Comments';

function App() {
  const [moviesState, moviesDispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{ moviesState, moviesDispatch }}>
      <div className="container">
        <div className="panel">
          <h2>Movies</h2>
          <hr />
          <List/>
        </div>
        <div className="panel">
          <div></div>
          {moviesState.selected > 0 && <Details />}
          <hr />
          {moviesState.selected > 0 && <Comments />}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;