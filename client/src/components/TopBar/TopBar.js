import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import menuAuth from '../../menu-grey.svg';
import menuGuest from '../../menu_guest_white.svg';
import GuestNavigation from './GuestNavigation';
import UserNavigation from './UserNavigation';
import Search from './Search';
import { getUserByUsername } from '../../actions/publicProfile/profile';

class TopBar extends React.Component {
  state = {
    displayNav: false
  };

  click = () => {
    this.setState({displayNav: !this.state.displayNav});
  }

  //temp solution
  isUsernamePath() {
    if(this.props.location.pathname === '/') return false;
    if(/\/reset\/*/.test(this.props.location.pathname)) return false;
    if(/\/login\/*/.test(this.props.location.pathname)) return false;
    if(/\/signup\/*/.test(this.props.location.pathname)) return false;
    if(/\/create-username\/*/.test(this.props.location.pathname)) return false;
    if(/\/dashboard\/*/.test(this.props.location.pathname)) return false;
    if(/\/edit-scope\/*/.test(this.props.location.pathname)) return false;
    if(/\/profile\/*/.test(this.props.location.pathname)) return false;
    if(/\/logout\/*/.test(this.props.location.pathname)) return false;
    if(/\/terms\/*/.test(this.props.location.pathname)) return false;
    return true;
  }

  render() {
    let isUsernamePath = this.isUsernamePath();

    return (
        <div className={classnames('App-header', {auth_component_container: this.props.isAuthenticated || isUsernamePath })}>
          <div className="logoContainer">
            <Link to={!this.props.isAuthenticated ? '/' : '/dashboard' }><h1 className={classnames('logoName', {guest_logo: !this.props.isAuthenticated && !isUsernamePath, auth_logo: this.props.isAuthenticated || isUsernamePath})}>Scopeme</h1></Link>
          </div>

          <div className={classnames('App_menu_icon_container', {App_menu_icon_container_auth: this.props.isAuthenticated || isUsernamePath})} onClick={this.click}>
            <img src={!this.props.isAuthenticated && !isUsernamePath ? menuGuest : menuAuth} alt="menu icon" width="32" height="32" />
          </div>

          {(this.props.isAuthenticated || isUsernamePath) &&  <Search getUserByUsername={this.props.getUserByUsername} history={this.props.history} />}

          <div className="responsive_nav_container_outer_fix_collapse">
            <div className={classnames('responsive_nav_container', {show: this.state.displayNav, hide: !this.state.displayNav})} onClick={this.click}>
              <nav className={classnames({guest_nav: !this.props.isAuthenticated && !isUsernamePath, user_nav: this.props.isAuthenticated || isUsernamePath})}>
                {!this.props.isAuthenticated ? <GuestNavigation /> : <UserNavigation /> }
              </nav>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}


export default connect(mapStateToProps, { getUserByUsername })(withRouter(TopBar));
