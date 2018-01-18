---
title: Firebase Authentication Summary
image:
image_small:
excerpt: "A high level guide to using Firebase Authentication."
---

This post is of a series of my guided notes on [firebase](/firebase).

Firebase auth is [pretty close to my dream of perfect authentication](/auth) and it's very easy to set up.

Write an `onAuthStateChanged` listener to respond to a user logging in or out of any authentication type:

```javascript
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } = user;
    window.user = { displayName, email, uid, photoURL };
  } else {
    // User is signed out.
    window.user = null;
  }
});
```

Also set up a `handleAuthError` error handler:

```javascript
const handleAuthError = ({ code, message, provider, email }) => {
  alert(message);
}
```

### FirebaseUI

The easiest way to trigger that `onAuthStateChanged` listener is to use [FirebaseUI](https://github.com/firebase/firebaseui-web) - pre-made UI auth components for Firebase Authentication.

To use it, `import firebaseui from 'firebaseui'` or drop these two lines in your `<head>`:

```html
<script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.css" />
```

Finally, add `<div id="firebaseui-auth-container"></div>` on your sign up/log in page and run this javascript:

```javascript
const firebaseUIConfig = {
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // comment out providers you haven't set up or don't want
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: "<your-terms-of-service-url>"
};

const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
firebaseUI.start("#firebaseui-auth-container", firebaseUIConfig);
```

Note that for a provider to work you'll need to set it up in [your project's Firebase Console](https://console.firebase.google.com/). Instructions for each provider are below.

### One-tap sign-up

demo: https://fir-ui-demo-84a6c.firebaseapp.com/#recaptcha=invisible

https://developers.google.com/identity/one-tap/web/overview

> With just one tap, they get a secure, token-based, passwordless account with your service, protected by their Google Account. As the process is frictionless, users are much more likely to register. Returning users are signed in automatically, even when they switch devices or platforms, or after their session expires.

### Email and Password

To log in with email and password, enable email and password as a login type in [your project's Console](https://console.firebase.google.com/) / Auth / Sign in method, then:

```javascript
// create user
firebase.auth().createUserWithEmailAndPassword(email, password).catch(handleAuthError);

// sign in
firebase.auth().signInWithEmailAndPassword(email, password).catch(handleAuthError);
```

### Phone

To log in with just a [phone number](https://firebase.google.com/docs/auth/web/phone-auth), enable Phone as a login type in [your project's Console](https://console.firebase.google.com/) / Auth / Sign in method, then:

```javascript
// set up an invisible recaptcha - not sure why Firebase requires this
const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('id-of-your-sign-in-button', {
  'size': 'invisible'
});

firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier).then(confirmationResult => {
  const code = prompt("SMS Sent! Enter the code you just got.");
  confirmationResult.confirm(code);
}).catch(error => {
  // might need to reset the CAPTCHA here?
  console.error(error);
});
```

### Google

To [log in with Google](https://firebase.google.com/docs/auth/web/google-signin), enable Google as a log in type in [your project's Console](https://console.firebase.google.com/) / Auth / Sign in method, then:

```javascript
const googleProvider = new firebase.auth.GoogleAuthProvider();
// optionally add a scope: https://developers.google.com/identity/protocols/googlescopes
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

firebase.auth().signInWithPopup(googleProvider).then(result => {
  // optionally store the Google Access Token, if you're doing other stuff with the Google API:
  const token = result.credential.accessToken;
  // `result.user` is also available here, but you should listen for onAuthStateChanged instead
}).catch(handleAuthError);

// you can also `signInWithRedirect` and `getRedirectResult`, but nah
```

### Facebook

To [log in with Facebook](https://firebase.google.com/docs/auth/web/facebook-login):

* [create a Facebook app](https://developers.facebook.com/) and get its `App ID` and `App Secret`
* enable Facebook as a log in type in [your project's Console](https://console.firebase.google.com/) / Auth / Sign in method and add the `App ID` and `App Secret` from facebook
* add your firebase OAuth redirect URI in [Facebook for Developers](https://developers.facebook.com/) / Product Settings / Facebook Login

Then:

```javascript
const facebookProvider = new firebase.auth.FacebookAuthProvider();
// optionally add a scope: https://developers.facebook.com/docs/facebook-login/permissions
// facebookProvider.addScope('user_birthday');

firebase.auth().signInWithPopup(facebookProvider).then(result => {
  // optionally store the Facebook Access Token, if you're doing other stuff with the Facebook API:
  const token = result.credential.accessToken;
  // `result.user` is also available here, but you should listen for onAuthStateChanged instead
}).catch(handleAuthError);

// you can also `signInWithRedirect` and `getRedirectResult`, but nah
```

### Custom Authentication

You can [make up your own way to authenticate users with Firebase](https://firebase.google.com/docs/auth/web/custom-auth) too, like [magic email login links](https://www.sitepoint.com/lets-kill-the-password-magic-login-links-to-the-rescue/).

First, visit your project's [Service Account](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) and click "Generate New Private Key".

Then add some authentication logic to your own server (or cloud function) to generate a [custom login token](https://firebase.google.com/docs/auth/admin/create-custom-tokens):

```javascript
import admin from "firebase-admin";

const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`
});

// optional additional claims to include in the auth token
const additionalClaims = {
  premiumAccount: true
};

// export a cloud function with custom auth logic
exports.login = functions.https.onRequest((req, res) => {
  const { email, password } = req.body;

  if(req.params.password === "correct horse battery staple"){
    admin.auth().createCustomToken(email, additionalClaims).then(token => {
      res.status(200).send({ token });
    }).catch(error => {
      res.status(500).send(error);
    })
  } else {
    res.status(401).send({ error: "wrong password. try https://www.xkcd.com/936/" });
  }
});
```

Finally, use this function to sign in with your client:

```javascript
fetch("<URL of your custom auth logic cloud function>")
.then(res => res.json())
.then(({ token, error }) => {
  if(error) throw error;
  firebase.auth().signInWithCustomToken(token);
}).catch(({code, message}) => {
  alert(message);
});
```

### Sign Out

Signing out of Firebase Authentication is straightforward:

```javascript
firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch(error => {
  alert(error)
});
```
