import {
  ADD_SCOPE, RECEIVE_SCOPES, REMOVE_SCOPE, SCOPE_FETCHED, SCOPE_UPDATED
} from '../actions/scopes';


export default function scopes(state = [], action={}) {
  switch (action.type) {
    case ADD_SCOPE:
      return [
        action.scope,
        ...state
      ];
    case RECEIVE_SCOPES:
      return action.scopes;

    case REMOVE_SCOPE:
      return state.filter(scope => scope._id !== action.scopeId);

    case SCOPE_FETCHED:
      const index = state.findIndex(scope => scope._id === action.scope._id);

      if (index > -1) {
        return state.map(scope => {
          if(scope._id === action.scope._id) return action.scope;
          //then return all other games that don't match the game passed
          //in from the action without modifying them
          return scope;
        });
      }else {
        return [
          ...state,
          action.scope
        ];
      }

    case SCOPE_UPDATED:
      return  state.map(scope => {
        //if scope passed in from the action matches any scope
        //already present in the redux state object then
        //replace that scope with the scope passed in from the action
        //because it means that it was updated
        if(scope._id === action.scope._id) return action.scope;
        //then return all other games that don't match the game passed
        //in from the action without modifying them
        return scope;
      });

    default:
      return state;
  }
}
