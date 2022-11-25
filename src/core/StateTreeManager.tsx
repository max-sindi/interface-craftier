import React from 'react';
import HtmlManager from './HtmlManager';
import AppManager from './AppManager';

const StateTreeManager = () => {
  return (
    <div>
      <AppManager />
      <HtmlManager />
    </div>
  );
};

export default StateTreeManager;
