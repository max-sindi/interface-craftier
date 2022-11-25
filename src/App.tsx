import React from 'react';
import './App.scss';
import './stylotron/src/styles.css';
import Project from './core';
import { Provider } from 'react-redux';
import makeStore from 'src/core/store';

const store = makeStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ whiteSpace: 'pre-wrap' }}>
        <Project />
        {/*{stringify(styles)}*/}
      </div>
    </Provider>
  );
}

export default App;
