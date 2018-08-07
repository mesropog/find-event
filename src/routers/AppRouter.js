import {BrowserRouter,Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/pages/HomePage';
import PageNotFound from '../components/pages/HomePage';
import Browse from '../components/pages/Browse';
import CreateEvent from '../components/pages/CreateEvent';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import SignOut from '../components/auth/SignOut';
import RequireAuth from '../components/auth/RequireAuth';
import AnimatedPage from '../components/pages/AnimatedPageHOC';
import EventPage from '../components/pages/EventPage';



const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={AnimatedPage(HomePage)} exact={true}/>
                <Route path="/browse" component={AnimatedPage(Browse)} />
                <Route path="/signup" component={AnimatedPage(SignUp)} />
                <Route path="/signin" component={AnimatedPage(SignIn)} />
                <Route path="/signout" component={AnimatedPage(SignOut)} />
                <Route path="/event/:id" component={AnimatedPage(EventPage)} />
                <Route component={AnimatedPage(PageNotFound)}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default AppRouter;