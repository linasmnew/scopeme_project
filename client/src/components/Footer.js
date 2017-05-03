import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

  isVisitorPage() {
    //if visitor page than add className footer_visitor
    //to make font color white because visitor pages have green background
    //and other pages have grey background so use darker font color
    if(this.props.location.pathname === '/') return true;
    if(/\/reset\/*/.test(this.props.location.pathname)) return true;
    if(/\/login\/*/.test(this.props.location.pathname)) return true;
    if(/\/signup\/*/.test(this.props.location.pathname)) return true;
    if(/\/terms\/*/.test(this.props.location.pathname)) return true;
    return false;
  }

  render() {
    let isVisitorPage = this.isVisitorPage();

    return (
      <div>
        <div className="footer_fix">
        </div>
        <div className={classnames('footer', {footer_visitor: isVisitorPage})}>
          <ul>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
          <p>© 2017 Scopeme</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
