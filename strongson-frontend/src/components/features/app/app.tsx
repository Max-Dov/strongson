import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Routes} from '@constants/routes.enum';
import {LandingPage} from '@components/pages/landing-page/landing-page.component';
import {TilesPage} from '@components/pages/tiles-page/tiles-page.component';
import '@commonStyles/base.scss';

export const App = () => {
    return (<div id="app">
        <BrowserRouter>
            <Switch>
                <Route exact path={Routes.LANDING}>
                    <LandingPage/>
                </Route>
                <Route exact path={Routes.TILES}>
                    <TilesPage/>
                </Route>
                <Route>
                    404 ¯\_(ツ)_/¯
                </Route>
            </Switch>
        </BrowserRouter>
    </div>);
};