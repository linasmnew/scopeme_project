import handleResponse from './utils/handleResponse';

export const RECEIVE_UPLOADED_PROFILE_PHOTO_URL = 'RECEIVE_UPLOADED_PROFILE_PHOTO_URL';

function receiveUploadedProfilePhotoUrl(image) {
  return {
    type: RECEIVE_UPLOADED_PROFILE_PHOTO_URL,
    image
  };
}

export function uploadPhotoRequest({image}) {
  let imgBody = new FormData();
  imgBody.append('image', image);

  return dispatch => {
    return fetch('/api/profile/photo', {
      method: 'POST',
      headers: {
        "Accept": "application/json"
      },
      body: imgBody,
      credentials: 'same-origin'
    }).then(handleResponse).then(data => {
      return dispatch(receiveUploadedProfilePhotoUrl(data.bio.image));
    });
  }
}
