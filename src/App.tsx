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
      </div>
    </Provider>
  );
}

export default App;



// window.reduxDispatch({type: 'updateVariable', payload: {
//     "aqua-1": "#00D2FF",
//     "itemBg": "#F2F4F8",
//     "black": "#000",
//     "dark-grey": "#878D92",
//     "text-grey": "#697077",
//     "text-black": "#21272A",
//     "red": "#C8300A",
//     "greyCaced": "#CACED2"
//   }})