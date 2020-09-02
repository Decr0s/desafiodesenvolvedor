import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import List from './pages/Lista/List';
import Create from './pages/Create/Create';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={List} />
            <Route path="/create" component={Create}/>
            <Route path="/edit/:id" component={Create}/>
        </Switch>
    </BrowserRouter>
);


export default Routes;