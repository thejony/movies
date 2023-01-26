import React, { useReducer } from 'react';
import Context from './Context';
import Reducer from "./Reducer";
import List from './List';
import Details from './Details';
import Comments from './Comments';
import SubmitForm from './SubmitForm';
import initialState from './InitialState.json';
import './App.css';

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
          {moviesState.selected > 0 && <SubmitForm />}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;