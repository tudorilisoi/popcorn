import React from 'react';
import { Route, Switch } from 'react-router';
 
// Module root components
import HomePage from './components/pages/HomePage';
import AnalyzePage from './components/pages/AnalyzePage';
import NotFoundPage from './components/pages/NotFoundPage';


export default (
  <Switch>
    <Route exact path="/" component={HomePage}/>    
    <Route exact path="/analyze/:id" component={AnalyzePage}/>    
    <Route path="*" component={NotFoundPage} />
  </Switch>
);
