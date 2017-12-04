import React from 'react';
import { Link } from 'react-router-dom';
import editIcon from '../../../pencil2-lighter.svg';

class Profile extends React.Component {
  state = {
    loading: false,
    errors: {}
  };

  triggerFileInput = (e) => {
    this.inputElement.click(); //triggers file input element
  }

  handleFileUpload = (e) => {
    const image = e.target.files[0];
    this.setState({loadingIndicator: true});

    this.props.uploadPhotoRequest({image}).then(() => {
      this.setState({loadingIndicator: false});
    }).catch(err => {
      if(!err.response) return this.setState({ errors: err.global});
      if (err.response) return err.response.json().then(data => this.setState({errors: data.errors}));
    });
  }

  render() {
    const fileInputStyle = {
      display: 'none'
    };
    let fullNameOrDescriptionExists = ((!!this.props.profile.bio && !!this.props.profile.bio.fullName) || (!!this.props.profile.bio && !!this.props.profile.bio.description));

    return (
      <div className="profile_container">
        {!!this.state.errors.global && <div className="general_form_error"><p>{this.state.errors.global}</p></div>}

        {this.state.loadingIndicator ? (
          <div className="loader"></div>
        ) : (

          <div className="profile_image_and_bio_container">
          <Link to="/profile" className="edit_profile_button"><img src={editIcon} alt="profile settings" width="24" height="24" /></Link>

            <div className="profile_image_cropper" onClick={this.triggerFileInput}>
              <input accept="image/x-png,image/jpeg" ref={input => this.inputElement = input} type="file" id="image_file" onChange={this.handleFileUpload} style={fileInputStyle} />
              {!!this.props.profile.bio && !!this.props.profile.bio.image && <img src={this.props.profile.bio.image} alt="profile" />}
            </div>

            {!!this.props.profile.username && <p className="username">{this.props.profile.username}</p>}

            {fullNameOrDescriptionExists &&
              <div className="bio_fullName_and_description_container">
                <p>
                  <span className="bio_fullName">{!!this.props.profile.bio && !!this.props.profile.bio.fullName && this.props.profile.bio.fullName }</span>
                  {!!this.props.profile.bio && !!this.props.profile.bio.description && this.props.profile.bio.description }
                </p>
              </div>
            }
          </div>
        )}
      </div>
    );
  }

}


export default Profile;
