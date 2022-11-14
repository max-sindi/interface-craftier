import React from 'react';
import './App.css';
import './stylotron/src/styles.css'
import styles from './stylotron/src/styles.json'
import stringify from "json-stringify-pretty-compact";
import Project from './core';

function App() {
  return (
    <div className="App" style={{ whiteSpace: 'pre-wrap'}}>
      <Project/>
      {/*{stringify(styles)}*/}
    </div>
  );
}

export default App;
