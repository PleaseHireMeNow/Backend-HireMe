import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../modules/db";
import { Session } from "../../../types/models/models";

export const getUserDocument = async (userId: string) => {
  const userRef = doc(collection(db, "users"), userId);
  const userData = await getDoc(userRef);

  const previousSessionsRef = collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"
  );

  const previousSessionsQuerySnapshot = await getDocs(previousSessionsRef);
  let session_history: Session[] = [];


  // ? updated logic will only try to grab previous sessions if they exist!
  // ? curious if the if statement is relevant here? if there's nothing in docs, nothing happens 🤷🏻‍♂️
  if (previousSessionsQuerySnapshot.docs[0] !== undefined) {
    previousSessionsQuerySnapshot.forEach(doc => {
      const sessionData = doc.data() as Session;
      session_history.push(sessionData);
    });

    // ! want to test reversing - how is the array returning by default?
    // session_history.reverse()
  }

  const currentSessionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );

  const currentSessionQuerySnapshot = await getDocs(currentSessionRef);
  let current_session = currentSessionQuerySnapshot.docs[0].data();

  return {
    user: userData.data(),
    session_history: session_history,
    current_session: current_session,
  };
};

export const tokenValidationMethodFail = () => {

}

export const tokenValidationWithGoogle: {} | false = (idToken: string, redirectUri: string) => {

  const YOUR_CLIENT_ID: string = idToken;
  const YOUR_REDIRECT_URI: string = redirectUri;
  const fragmentString: string = location.hash.substring(1);

  // Define the type for params
  interface Params {
    [key: string]: string;
  }

  // Parse query string to see if page request is coming from OAuth 2.0 server.
  const params: Params = {};
  const regex: RegExp = /([^&=]+)=([^&]*)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params));
    if (params['state'] && params['state'] === 'try_sample_request') {
      trySampleRequest();
    }
  }

  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': idToken,
                  'redirect_uri': redirectUri,
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  
  // The ID token is properly signed by Google. Use Google's public keys (available in JWK or PEM format) to verify the token's signature. These keys are regularly rotated; examine the Cache-Control header in the response to determine when you should retrieve them again.

  // The value of aud in the ID token is equal to one of your app's client IDs. This check is necessary to prevent ID tokens issued to a malicious app being used to access data about the same user on your app's backend server.

  // The value of iss in the ID token is equal to accounts.google.com or https://accounts.google.com.

  // The expiry time (exp) of the ID token has not passed.

  // If you need to validate that the ID token represents a Google Workspace or Cloud organization account, you can check the hd claim, which indicates the hosted domain of the user. This must be used when restricting access to a resource to only members of certain domains. The absence of this claim indicates that the account does not belong to a Google hosted domain.


  const oAuthResults;
  return oAuthResults;
}

export const getUserFromDatabase = () => {

}

export const updateUserInDatabase = () => {

}

