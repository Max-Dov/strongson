import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LandingPage} from '@components/pages/landing.page';
import {Routes} from '@constants/routes.enum';

export const App = () => {
    return (<div id="app">
        <BrowserRouter>
            <Switch>
                <Route exact path={Routes.LANDING}>
                    <LandingPage/>
                </Route>
                <Route>
                    404 ¯\_(ツ)_/¯
                </Route>
            </Switch>
        </BrowserRouter>
    </div>);
};