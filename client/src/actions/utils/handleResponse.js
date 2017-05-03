export default function handleResponse(response) {
      //response.ok is handled in async action itself
      //every other case is handled inside catch inside component calling the action

  if (!response) {
      //client side network issue, even server side 500 still returns a response
      let error = new Error();
      error.global = {global: 'There was a problem connecting to the server'};
      throw error;

  } else if(response.ok) {
      //2xx response
      return response.json();

  } else if(response.status === 500) {
      //server side 500
      let error = new Error();
      //go to server side and only return 500, get rid of json response
      error.global = {global: "We're currently experiencing issues, please try again later"};
      throw error;

  } else {
      //server side 4xx
      let error = new Error();
      //attach response to error so can use it in components
      error.response = response;

      throw error;
  }
}
