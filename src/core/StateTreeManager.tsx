import React from 'react';
import HtmlManager from './HtmlManager';
import AppManager from './AppManager';
import { GlobalState } from './Project';

const StateTreeManager = () => {
  return (
    <div style={{}}>
      <AppManager />
      <HtmlManager />
    </div>
  );
};

export default StateTreeManager;
