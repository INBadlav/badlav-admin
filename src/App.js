import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import PostArticle from './components/PostArticle/PostArticle';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import ArticleDashboard from './components/ArticleDashboard/ArticleDashboard';


const App = () => (
    <Router>
        <AppBar></AppBar>
        <Route path="/" exact component = {ArticleDashboard}></Route>
        <Route path="/postArticle" exact component = {PostArticle}></Route>
        <Route path="/updateArticle" exact component = {UpdateArticle}></Route>
    </Router>
);

export default App;