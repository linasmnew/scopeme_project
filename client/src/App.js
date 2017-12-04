import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import TermsAndPrivacyPage from './components/TermsAndPrivacy/TermsAndPrivacyPage';
import ResetPasswordPage from './components/ResetPassword/ResetPasswordPage';
import DashboardPage from './components/UserArea/Dashboard/DashboardPage';
import ProfilePage from './components/UserArea/Profile/ProfilePage';
import EditScope from './components/UserArea/Dashboard/EditScope';
import UsernameCreation from './components/UserArea/Dashboard/UsernameCreation';
import isAuthenticated from './components/AuthenticationHOC';
import PreventAccessIfAuth from './PreventAccessIfAuth';
import TopBar from './components/TopBar/TopBar';
import Logout from './components/UserArea/Dashboard/Logout';
import Footer from './components/Footer.js';
import PublicProfilePage from './components/PublicProfile/PublicProfilePage';
import NotFound from './404';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classnames('app_wrapper', {user_app_wrapper: this.props.isAuthenticated, guest_app_wrapper: !this.props.isAuthenticated})}>
          <div className="App">
            <TopBar />
            <Switch>
              <Route exact path="/" component={PreventAccessIfAuth(HomePage)} />
              <Route exact path="/login" component={PreventAccessIfAuth(LoginPage)} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/terms" component={TermsAndPrivacyPage} />
              <Route exact path="/reset" component={PreventAccessIfAuth(ResetPasswordPage)} />
              <Route exact path="/reset/:id" component={PreventAccessIfAuth(ResetPasswordPage)} />
              <Route exact path="/create-username" component={isAuthenticated(UsernameCreation)} />
              <Route exact path="/dashboard" component={isAuthenticated(DashboardPage)} />
              <Route exact path="/edit-scope/:id" component={isAuthenticated(EditScope)} />
              <Route exact path="/profile" component={isAuthenticated(ProfilePage)} />
              <Route exact path="/logout" component={isAuthenticated(Logout)} />
              <Route exact path="/:username" component={PublicProfilePage} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
