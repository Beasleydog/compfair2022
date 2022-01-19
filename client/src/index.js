import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
// import './styles/input.css';

render((
    <div>
        <div className="underline text-ellipsis">
            test
        </div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/list' component={List} />
            </Switch>
        </BrowserRouter>
    </div>

), document.getElementById('root'));
