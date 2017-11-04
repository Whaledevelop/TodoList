import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import '../imports/css/bootstrap.css';
import '../imports/css/fa/css/font-awesome.min.css';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});