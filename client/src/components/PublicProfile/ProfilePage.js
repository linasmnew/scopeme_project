import React from 'react';

const ProfilePage = ({ username, bio }) => {

    let fullNameOrDescriptionExists = ((!!bio && !!bio.fullName) || (!!bio && !!bio.description));

    return (
      <div className="profile_container">
        <div className="profile_image_and_bio_container">

          <div className="profile_image_cropper">
            {!!bio && !!bio.image && <img src={bio.image} alt="profile" />}
          </div>

          {!!username && <p className="username">{username}</p>}

          {fullNameOrDescriptionExists &&
            <div className="bio_fullName_and_description_container">
              <p>
                <span className="bio_fullName">{!!bio && !!bio.fullName && bio.fullName }</span>
                {!!bio && !!bio.description && bio.description }
              </p>
            </div>
          }
        </div>
      </div>
    );
}

export default ProfilePage;
