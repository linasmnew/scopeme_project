import { RECEIVE_PROFILE, RECEIVE_UPDATED_PROFILE } from '../actions/profile';
import { RECEIVE_CREATED_USERNAME } from '../actions/createUsername';
import { RECEIVE_UPLOADED_PROFILE_PHOTO_URL } from '../actions/photoUpload';

export default function profile(state = {}, action={}) {
  switch (action.type) {
    case RECEIVE_CREATED_USERNAME:
      return Object.assign({}, state, {
        bio: action.username
      });


    case RECEIVE_PROFILE:
      return Object.assign({}, state, {
        bio: action.profile.bio,
        username: action.profile.username,
        email: action.profile.local.email
      });


    case RECEIVE_UPDATED_PROFILE:
      return Object.assign({}, state, {
        bio: action.profile.bio,
        username: action.profile.username,
        email: action.profile.local.email
      });

    case RECEIVE_UPLOADED_PROFILE_PHOTO_URL:
      return Object.assign({}, state, {
        bio: {
          ...state.bio,
          image: action.image
        }
      });

    default:
      return state;
  }
}
