import React from 'react';
import classnames from 'classnames';
import searchIcon from '../../search.svg';

class Search extends React.Component {
  state = {
    displaySearchResults: false,
    found: false,
    searchValue: '',
    username: '',
    fullName: '',
    inFocus: false
  }

  handleChange = (e) => {
    this.setState({displaySearchResults: e.target.value === '' ? false : true, [e.target.name]: e.target.value });
    if (e.target.value !== '') { this.handleSubmit(e.target.value); } else { return; }
  }

  handleSubmit = (value) => {
    this.props.getUserByUsername(value).then(data => {
      this.setState({found: true, fullName: data.bio && data.bio.fullName ? data.bio.fullName : '', username: data.username});
    }).catch(err => {
      this.setState({found: false});
    });
  }

  //click on search results
  handleClick = (e) => {
    this.setState({displaySearchResults: false, searchValue: '', inFocus: !this.state.inFocus});
    this.props.history.push(`/${this.state.username}`);
  }

  toggleSearchClassName = (e) => {
    if(this.state.searchValue === ''){
      this.setState({inFocus: !this.state.inFocus});
    }
  }

  render() {
    let displayFound = this.state.displaySearchResults && this.state.found ? true : false;
    let displayNotFound = this.state.displaySearchResults && !this.state.found ? true : false;

    return (
      <div className="searchContainer">
        <div className="searchContainerInnerFix">
        <div className={classnames('search_input_container', {search_input_container_input_focused: this.state.inFocus})}>
          <span className="search_icon_span"><img src={searchIcon} width="16" height="16" alt="search icon" /></span>
          <input type="search" name="searchValue" placeholder="Search" value={this.state.searchValue} onChange={this.handleChange} onFocus={this.toggleSearchClassName} onBlur={this.toggleSearchClassName} autoComplete="off" />
        </div>

        {displayFound &&
          <div className="search_results" onClick={this.handleClick}>
            <p className="search_results_username">{this.state.username}</p>
            <p className="search_results_fullName">{this.state.fullName}</p>
          </div>
        }
        {displayNotFound &&
          <div className="search_results">
            <p className="search_results_noMatch">No match found</p>
          </div>
        }
        </div>
      </div>
    );
  }
}


export default Search;
